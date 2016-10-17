WebCodeEditor
=======

![Screenshot](https://raw.githubusercontent.com/shcoder-ru/web-code-editor/master/Screenshot.png)

### Install dependencies    
##### Install gcc g++ make    
``` sh
apt-get update
apt-get install gcc g++ make
```
##### Install node    
``` sh
NODEVERSION=4.6.0
wget http://nodejs.org/dist/v$NODEVERSION/node-v$NODEVERSION.tar.gz
tar xvfz node-v$NODEVERSION.tar.gz
cd node-v$NODEVERSION
./configure
make
make install
node -v
```
##### Install less    
``` sh
apt-get install rubygems
gem install less
```
##### Development    
``` sh
npm i
grunt
```
##### Build    
``` sh
grunt build
```
