native_messaging_hosts_dir =  mozdir / 'native-messaging-hosts'
appdir = native_messaging_hosts_dir / meson.project_name()

name = meson.project_name().replace('-', '_')
configure_file(
  input: 'extension.json.in',
  output: name + '.json',
 	configuration: configuration_data({
 	  'name': name,
    'path': appdir / 'main.py'}),
 	install: true,
  install_dir:  native_messaging_hosts_dir )

python = import('python').find_installation(
  'python3',
  modules: ['json', 'struct', 'base64'])
configure_file(
  input: 'main.py',
  output: '@PLAINNAME@',
 	configuration: configuration_data({
    'python': python.full_path()}),
 	install: true,
  install_dir: appdir,
  install_mode: ['rwxr-xr-x'],)

install_data([
  'internal' / 'card.py',
  'internal' / '__init__.py'],
  install_dir: appdir / 'internal',)
