import { app } from './app'

app.listen(3000, (err) => {
	if (err) {
		console.error(err)
	}
	console.log('server running')
})
