project('myna-browser-extension',
	version: '0.1.0',
	meson_version: '>= 0.59.0',
	default_options: [ 'warning_level=2', ])

md = get_option('mozdir')
md_fallback = get_option('prefix') / 'lib' / 'mozilla'
mozdir = md != '' ? md : md_fallback

subdir('src')
