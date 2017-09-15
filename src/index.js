module.exports = function check(str, bracketsConfig) {
  var openBrackets = [];
  var closeBrackets = [];
  var bracketsStack = [];

  for (var i=0; i<bracketsConfig.length; i++) {
    openBrackets[i] = bracketsConfig[i][0];
    closeBrackets[i] = bracketsConfig[i][1];
  }

  for (var i=0; i<str.length; i++) {
    if (closeBrackets.indexOf(str[i]) != -1) {
      var currentBracket = bracketsStack.pop();

      if (openBrackets.indexOf(str[i]) != -1) {
          if (currentBracket) {
            if (currentBracket != str[i]) {
              bracketsStack.push(currentBracket);
              bracketsStack.push(str[i])
            }
          }
          else bracketsStack.push(str[i]);
        }
      else {
          var closeBracketIndex = getBracketIndex(closeBrackets, str[i]);
          var openBracketIndex = getBracketIndex(openBrackets, currentBracket);
          if (closeBracketIndex != openBracketIndex) return false;
      }
    }
    else bracketsStack.push(str[i]);
  }

  if (bracketsStack.length != 0) return false;
    else return true;

  function getBracketIndex(bracketsArr, bracket){
    var bracketIndex = null;
    for (var i=0; i<bracketsArr.length; i++)
      if (bracket == bracketsArr[i]) {bracketIndex = i; break;}
    return bracketIndex;
  }
}
