const {
	lift,
	head,
	pipe,
	always,
	concat
} = require('ramda')
const {
	Stream,
	util
} = require('../../src')
const {
	log,
	shuffle
} = util

const randomItem = pipe(shuffle, head)
const randomSuit = pipe(always(["♠", "♥", "♦", "♣"]), randomItem)
const randomValue = pipe(always(["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]), randomItem)

const suits = Stream.intervalApply(randomSuit, 1000)
const values = Stream.intervalApply(randomValue, 1000)
const randomCards = lift(concat)

randomCards(suits, values)
	.subscribe(log('card:'))