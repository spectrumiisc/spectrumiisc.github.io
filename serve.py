import sys
# sys.path.insert(0,'./modules/cherrypy.zip')
import cherrypy,os

sys.path.append('./modules/pages')
from webroot import *
from sflDB import *

conf = {
        '/':
        {'tools.staticdir.root': os.path.dirname(os.path.abspath(__file__))},
          '/home': {
          'tools.staticdir.on': True,
          'tools.staticdir.dir': 'home/'},
		  '/home/main': {
          'tools.staticdir.on': True,
          'tools.staticdir.dir': 'home/main'},
		  '/home/activities': {
          'tools.staticdir.on': True,
          'tools.staticdir.dir': 'home/activities'},
		  '/static/css': {
          'tools.staticdir.on': True,
          'tools.staticdir.dir': 'static/css'},		  		 
		  '/static/scripts': {
          'tools.staticdir.on': True,
          'tools.staticdir.dir': 'static/scripts'},	
		  '/static/pics': {
          'tools.staticdir.on': True,
          'tools.staticdir.dir': 'static/pics'		  
        }
      }

basepath = os.path.dirname(__file__) + './Database/'
print(os.path.dirname(__file__)) 
print(basepath)
DB = sflDB(basepath,True)

root = Root(cherrypy,DB)

#cherrypy.server.socket_host = 'www.NeuroElectronics_MEA.com'
cherrypy.server.socket_host = '0.0.0.0'
cherrypy.quickstart(root,config=conf)
	  
