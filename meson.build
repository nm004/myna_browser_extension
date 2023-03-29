project('myna_browser_extension',
  version: '0.1.0',
  meson_version: '>= 0.59.0',
  default_options: ['warning_level=2'])

md = get_option('mozdir')
md_fallback = get_option('prefix') / 'lib' / 'mozilla'
mozdir = md != '' ? md : md_fallback

python = import('python').find_installation(
  'python3',
  modules: ['json', 'struct', 'base64'])

configure_file(
  input: 'src/__main__.py',
  output: '@PLAINNAME@',
  configuration: configuration_data({
    'python': python.full_path()}),
  install: true,
  install_dir: python.get_install_dir() / meson.project_name(),
  install_mode: ['rwxr-xr-x'])

configure_file(
  input: 'extension.json.in',
  output:  meson.project_name()+ '.json',
  configuration: configuration_data({
    'name': meson.project_name(),
    'path': python.get_install_dir() / meson.project_name() / '__main__.py'}),
  install: true,
  install_dir: mozdir / 'native-messaging-hosts')

python.install_sources(
  'src/_internal/card.py',
  'src/_internal/__init__.py',
  subdir: meson.project_name() / '_internal')
