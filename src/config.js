export const API_ROOT = (process.env.NODE_ENV === 'production')
		// ? 'http://www.lambda-study.com:9000/'
    ? 'https://api.lambda-study.com/'
		:'http://127.0.0.1:9000/'

export const CookieDomain = (process.env.NODE_ENV === 'production')
		? '.lambda-study.com'
		: ''

export const indexImg = 'https://assets.lambda-study.com/lambda%2Freact_title.jpg?imageslim'
export const qiniuImageUrl = 'https://assets.lambda-study.com/images/'
export const headBgUrl = 'https://assets.lambda-study.com/images/bg-29.jpg?imageslim'
export const loginBgUrl = 'https://assets.lambda-study.com/images/backimg.jpg?imageslim'
export const feedBgUrl = 'https://assets.lambda-study.com/feed/site_bg.jpg?imageslim'

export const defaultTopic = 'Nodejs'

export const imgCount = 145
export const limtPage = 12
export const limitBbsPage = 20
export const limitHot = 8

export const Values = {
  article: 10,
  video: 50,
  book: 10,
  comment: 0,
  collect: 0
};

export const HOST = (process.env.NODE_ENV === 'production')
		? 'http://www.lambda-study.com'
		: 'http://127.0.0.1:3000'

export const ChatHOST = (process.env.NODE_ENV === 'production')
    ? 'http://chat.lambda-study.com'
    : 'http://127.0.0.1:4000'


//支付配置
export const passpay = {
    request_url: 'http://pay.passpay.net/PayOrder/payorder',
    my_url:'https://www.lambda-study.com',
    user_seller:'304897',  //商户号
    partner: '089721636691970',  //商户PID
    key: 'rF4uuS8cfGWjsWXUTn6vZXz5wcEBdYuQ',
};