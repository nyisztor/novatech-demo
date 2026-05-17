// NovaTech Login Page Generator — Figma Plugin
// Generates the login.html layout as a Figma frame using NovaTech design tokens

function hex(h) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
  return r ? { r: parseInt(r[1], 16) / 255, g: parseInt(r[2], 16) / 255, b: parseInt(r[3], 16) / 255 } : { r: 0, g: 0, b: 0 };
}

function solid(color) {
  return [{ type: 'SOLID', color: hex(color) }];
}

function solidA(color, opacity) {
  return [{ type: 'SOLID', color: hex(color), opacity }];
}

// Linear gradient fill — matches CSS linear-gradient(160deg, from, to)
function gradientLinear(fromHex, toHex, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const from = hex(fromHex);
  const to = hex(toHex);
  return [{
    type: 'GRADIENT_LINEAR',
    gradientStops: [
      { position: 0, color: { r: from.r, g: from.g, b: from.b, a: 1 } },
      { position: 1, color: { r: to.r, g: to.g, b: to.b, a: 1 } }
    ],
    gradientTransform: [
      [cos, sin, 0.5 - cos * 0.5 - sin * 0.5],
      [-sin, cos, 0.5 + sin * 0.5 - cos * 0.5]
    ]
  }];
}

async function font(family, style) {
  await figma.loadFontAsync({ family, style });
}

async function text(parent, chars, size, family, style, color, opts = {}) {
  await font(family, style);
  const t = figma.createText();
  t.fontName = { family, style };
  t.fontSize = size;
  t.characters = chars;
  t.fills = solid(color);
  if (opts.name) t.name = opts.name;
  if (opts.align) t.textAlignHorizontal = opts.align;
  if (opts.width) t.resize(opts.width, t.height);
  if (opts.lineHeight) t.lineHeight = { unit: 'PERCENT', value: opts.lineHeight };
  parent.appendChild(t);
  return t;
}

function frame(parent, name, w, h, opts = {}) {
  const f = figma.createFrame();
  f.name = name;
  f.resize(w, h);
  f.fills = opts.fills || [];
  if (opts.color) f.fills = solid(opts.color);
  if (opts.gradient) f.fills = opts.gradient;
  if (opts.radius !== undefined) f.cornerRadius = opts.radius;
  if (opts.stroke) {
    f.strokes = [{ type: 'SOLID', color: hex(opts.stroke) }];
    f.strokeWeight = opts.strokeWeight || 1;
  }
  if (opts.layout) {
    f.layoutMode = opts.layout;
    f.primaryAxisSizingMode = opts.primarySizing || 'FIXED';
    f.counterAxisSizingMode = opts.counterSizing || 'FIXED';
    f.primaryAxisAlignItems = opts.primaryAlign || 'MIN';
    f.counterAxisAlignItems = opts.counterAlign || 'MIN';
    if (opts.gap !== undefined) f.itemSpacing = opts.gap;
    if (opts.padding) {
      const [t, r, b, l] = Array.isArray(opts.padding) ? opts.padding : [opts.padding, opts.padding, opts.padding, opts.padding];
      f.paddingTop = t; f.paddingRight = r; f.paddingBottom = b; f.paddingLeft = l;
    }
  }
  if (opts.shadow) {
    f.effects = [{
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.1 },
      offset: { x: 0, y: 10 },
      radius: 15,
      spread: -3,
      visible: true,
      blendMode: 'NORMAL'
    }];
  }
  if (parent) parent.appendChild(f);
  return f;
}

function rect(parent, name, w, h, opts = {}) {
  const r = figma.createRectangle();
  r.name = name;
  r.resize(w, h);
  r.fills = opts.color ? solid(opts.color) : (opts.fills || []);
  if (opts.radius !== undefined) r.cornerRadius = opts.radius;
  if (opts.stroke) {
    r.strokes = [{ type: 'SOLID', color: hex(opts.stroke) }];
    r.strokeWeight = opts.strokeWeight || 1;
  }
  if (parent) parent.appendChild(r);
  return r;
}

async function inputField(parent, labelText, placeholder, opts = {}) {
  const group = frame(parent, opts.name || labelText, 344, 68, {
    layout: 'VERTICAL', primarySizing: 'AUTO', counterSizing: 'FIXED', gap: 6
  });

  if (opts.labelRow) {
    const labelRow = frame(group, 'Label Row', 344, 20, {
      layout: 'HORIZONTAL', primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
      primarySizing: 'FIXED', counterSizing: 'AUTO'
    });
    await text(labelRow, labelText, 14, 'Inter', 'Medium', '#334155', { name: 'Label' });
    await text(labelRow, 'Forgot password?', 14, 'Inter', 'Medium', '#2563eb', { name: 'Forgot Link' });
  } else {
    await text(group, labelText, 14, 'Inter', 'Medium', '#334155', { name: 'Label' });
  }

  const input = frame(group, 'Input', 344, 44, {
    color: '#ffffff', radius: 6, stroke: '#cbd5e1',
    layout: 'HORIZONTAL', primarySizing: 'FIXED', counterSizing: 'FIXED',
    primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER', padding: [0, 12, 0, 12], gap: 0
  });

  await text(input, placeholder, 14, 'Inter', 'Regular', '#94a3b8', { name: 'Placeholder' });

  if (opts.hasToggle) {
    const eyeContainer = frame(input, 'Toggle Icon', 20, 20, { fills: [] });
    rect(eyeContainer, 'Eye Shape', 20, 12, { fills: solidA('#64748b', 0.6), radius: 10 });
  }

  return group;
}

async function main() {
  // Pre-load all fonts used in the plugin
  await Promise.all([
    figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Bold' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' }),
  ]);

  // Create a brand-new page instead of renaming the current one
  const page = figma.createPage();
  page.name = 'Login Page';
  figma.currentPage = page;

  // Root frame — 1440×900 desktop
  const root = frame(null, 'Login Page / Desktop 1440', 1440, 900, {
    layout: 'HORIZONTAL', primarySizing: 'FIXED', counterSizing: 'FIXED',
    primaryAlign: 'MIN', counterAlign: 'MIN'
  });
  root.x = 0;
  root.y = 0;
  page.appendChild(root);

  // ── Left: Brand panel ──────────────────────────────────────────────────────
  // Matches CSS: linear-gradient(160deg, #1e3a8a 0%, #1e40af 100%)
  const brand = frame(root, 'Brand Panel', 720, 900, {
    gradient: gradientLinear('#1e3a8a', '#1e40af', 160),
    layout: 'VERTICAL', primarySizing: 'FIXED', counterSizing: 'FIXED',
    primaryAlign: 'CENTER', counterAlign: 'MIN', gap: 24, padding: [80, 64, 80, 64]
  });

  await text(brand, 'NovaTech', 36, 'Inter', 'Bold', '#ffffff', { name: 'Brand Logo' });
  await text(brand, 'Technology consulting for modern businesses', 18, 'Inter', 'Regular', '#bfdbfe', {
    name: 'Tagline', width: 592, lineHeight: 175
  });

  const featureList = frame(brand, 'Features', 592, 20, {
    layout: 'VERTICAL', primarySizing: 'AUTO', counterSizing: 'FIXED', gap: 16
  });

  // CSS uses ✓ checkmark via ::before pseudo-element
  for (const feat of ['Cloud-native solutions', 'Expert technology consulting', 'Data-driven strategies']) {
    const row = frame(featureList, `Feature: ${feat}`, 592, 20, {
      layout: 'HORIZONTAL', primarySizing: 'FIXED', counterSizing: 'AUTO',
      counterAlign: 'CENTER', gap: 12
    });
    await text(row, '✓', 16, 'Inter', 'Bold', '#14b8a6', { name: 'Check' });
    await text(row, feat, 16, 'Inter', 'Regular', '#93c5fd', { name: 'Text' });
  }

  // ── Right: Login main ──────────────────────────────────────────────────────
  const loginMain = frame(root, 'Login Main', 720, 900, {
    color: '#f8fafc',
    layout: 'VERTICAL', primarySizing: 'FIXED', counterSizing: 'FIXED',
    primaryAlign: 'CENTER', counterAlign: 'CENTER'
  });

  // Login card — matches .login-card: white, radius-xl (12px), shadow-xl, padding 40px
  const card = frame(loginMain, 'Login Card', 440, 20, {
    color: '#ffffff', radius: 12, shadow: true,
    layout: 'VERTICAL', primarySizing: 'AUTO', counterSizing: 'FIXED',
    primaryAlign: 'MIN', counterAlign: 'MIN', gap: 24, padding: [40, 40, 40, 40]
  });

  // Card header
  const header = frame(card, 'Card Header', 360, 20, {
    layout: 'VERTICAL', primarySizing: 'AUTO', counterSizing: 'FIXED', gap: 8
  });
  await text(header, 'NovaTech', 20, 'Inter', 'Bold', '#2563eb', { name: 'Logo' });
  await text(header, 'Welcome back', 28, 'Inter', 'Bold', '#0f172a', { name: 'Title' });
  await text(header, 'Sign in to your account to continue', 15, 'Inter', 'Regular', '#64748b', { name: 'Subtitle' });

  // Form fields
  await inputField(card, 'Email address *', 'you@example.com', { name: 'Email Field' });
  await inputField(card, 'Password *', 'Enter your password', { name: 'Password Field', labelRow: true, hasToggle: true });

  // Remember me
  const remember = frame(card, 'Remember Me', 360, 24, {
    layout: 'HORIZONTAL', primarySizing: 'FIXED', counterSizing: 'AUTO',
    counterAlign: 'CENTER', gap: 8
  });
  rect(remember, 'Checkbox', 16, 16, { color: '#ffffff', stroke: '#cbd5e1', radius: 3 });
  await text(remember, 'Remember me for 30 days', 14, 'Inter', 'Regular', '#475569');

  // Sign in button — matches .btn--primary: #2563eb, radius 6px
  const btn = frame(card, 'Sign In Button', 360, 48, {
    color: '#2563eb', radius: 6,
    layout: 'HORIZONTAL', primarySizing: 'FIXED', counterSizing: 'FIXED',
    primaryAlign: 'CENTER', counterAlign: 'CENTER'
  });
  await text(btn, 'Sign in', 16, 'Inter', 'Semi Bold', '#ffffff');

  // Card footer
  const footer = frame(card, 'Card Footer', 360, 20, {
    layout: 'HORIZONTAL', primarySizing: 'FIXED', counterSizing: 'AUTO',
    primaryAlign: 'CENTER', counterAlign: 'CENTER', gap: 4
  });
  await text(footer, "Don't have an account?", 14, 'Inter', 'Regular', '#64748b');
  await text(footer, 'Contact us', 14, 'Inter', 'Medium', '#2563eb');

  figma.viewport.scrollAndZoomIntoView([root]);
  figma.notify('✓ NovaTech Login Page created!');
  figma.closePlugin();
}

main().catch(err => {
  figma.notify('Error: ' + err.message, { error: true });
  figma.closePlugin();
});
