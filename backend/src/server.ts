import { app } from './app'
import { env } from './env'

app.listen(Number(env.PORT), (err) => {
	if (err) {
		console.error(err)
	}
	console.log('server running')
})
