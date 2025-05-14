import { app } from './app'
import { env } from './env'

app.listen(env.PORT, (err) => {
	if (err) {
		console.error(err)
	}
	console.log('server running')
})
