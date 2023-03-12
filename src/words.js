function getUserWord() {
  var userWord = prompt("Введите слово:");
  if (userWord === null) { // пользователь нажал на кнопку "Отмена"
    return getUserWord(); // вызываем функцию снова
  } else {
    return userWord;
  }
}

export { getUserWord };
