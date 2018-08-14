if(process.env.NODE_ENV === 'production'){
 module.exports = {
 	mongoURI: 'mongodb://mahmudul:mahmudul5809@ds121182.mlab.com:21182/story_books_dev',
 }
}else{
  module.exports = {
  	mongoURI : 'mongodb://localhost:27017/story_books_dev'
  }
}
