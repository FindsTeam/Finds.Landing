const quotes = [
  'не все то золото, что блестит',
  'мал золотник, да дорог',
  '3x^3 + const, ну что там?',
  '42',
  'git add --all',
  'хлеб и зрелища',
  'желтый снег на обочине интернета',
  'грузите апельсины бочках',
  'never gonna give you up',
  'чай, кофе, потанцуем',
  'ты заходи, если что',
  'и целого мира мало',
  'думай, что в стакане вода',
  'бюро находок',
  'молодость моя',
  'оранжевый свитшот без рукавов',
  'а вы слушаете radio plato?',
  'эти надписи выпадают в случайном порядке',
  'зноў гучыць забыты вальс',
  'место для шага вперед',
  'осколки снов смоет утренний дождь',
  'вечно молодой',
  'гэта не прызванне, гэта пазіцыя',
  'танчуць мае ногі',
  'это любовь',
  'ищем бесплатные штуки',
  'нешта табе невядомае!',
  'прямо за мечтой',
  'хтосьці ёсць няма кагосьці',
  'постой, паровоз',
  'панельного неба краюха',
  'last night a dj saved my life'
];
const state = {
  on: '1',
  off: '0'
};
const randomIndex = length => Math.floor(Math.random() * length);
const fadeout = element => element.style.opacity = state.off;
const fadein = element => element.style.opacity = state.on;

(function () {
  setTimeout(() => {
    const element = document.getElementById('quote');

    if (element) {
      fadeout(element);

      setTimeout(() => {
        const quote = quotes[randomIndex(quotes.length)];
      
        element.innerText = `> ${ quote } <`;
        fadein(element);
      }, 1000);
    }
  }, 8000);
}());