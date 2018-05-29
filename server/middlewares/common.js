import koaBody from 'koa-bodyparser'
import session from 'koa-session'
import getClintIp from 'ipware'

const get_ip = getClintIp().get_ip

export const addBody = app => {
	app.use(koaBody())
}

export const addSession = app => {
  app.keys = ['fafuna']

  const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    signed: true,
    rolling: false,
  }

  app.use(session(CONFIG, app))
}

export const ipInfo = app => {
  app.use(function(req, res) {
    req.ip_info = get_ip(req)
  })
}
