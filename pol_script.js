document.addEventListener("DOMContentLoaded", function() {
  var p, q, tab_p, tab_q;
  //function validation
  function validatePolynomialInput(input) {
  // A polynomial should have at least one term
    if (!input.match(/[0-9]*x\^[0-9]+/)) {
      return false;
    }

    // Check that the input string only contains valid characters
    if (!input.match(/^[+-]?(\s*[0-9]*x\^[0-9]+|\s*[0-9]*x|\s*[0-9]+)\s*([+-]\s*\d*\s*x\^\d+|\s*[+-]\s*\d*\s*x|\s*[+-]\s*\d+)*$/)) {
      return false;
    }

    return true;
  }
  //values --> coefficient
  function parsePolynomial(s1) {
    let s = s1.replace(/\s+/g, ''); //remove spaces from a string
    let tab = new Array(26).fill(0);
    let c = 1;
    let n = s.length;
    if (s[0] == '-') {
        c = -1;
    }
    let val = 0;
    let variable = "";
    for (let i = 0; i < n; i++) {
        if (s[i] == 'x' || s[i] == 'X') {
          if (i == n - 1) {
              tab[1] = parseInt(variable) * c;
              val = 0;
          } else {
              if (variable == "" || variable == "+") {
                  val = 1 * c;
              } else if (variable == "-") {
                  val = -1 * c;
              } else {
                  val = parseInt(variable) * c;
              }
              variable = "";
          }

        } else if ((s[i] == '-' || s[i] == '+') && i > 0) {
            if (s[i - 1] == 'x') {
                tab[1] = val;
            } else {
                tab[parseInt(variable)] = val;
            }
            val = 0;
            variable = "";
            c = (s[i] == '-' ? -1 : 1);
        } else if (s[i] != '-' && s[i] != '^') {
            variable += s[i];
        }
    }

    if (val != 0) {
        tab[parseInt(variable)] = val;

    }else if ((s[0]=='x' || s[0]=='X' )&& n==1)
      tab[1]= 1 ;
    else if (s[n - 1] != 'x' && s[n - 1] != 'X') {
        tab[0] = parseInt(variable) * c;
    }
    else if (s[n-1]=='x' || s[n-1]=='X' && (s[n-2]=='-' || s[n-2]=='+')){
      if (s[n-2]=='-')
        tab[1] = -1 ;
      else if (s[n-2]=='+')
        tab[1]= 1 ;
    }
    return tab;
  }
  //display the result
  function print_result(tab){
    let ch = "";
    for (let i = 25; i >= 0; i--) {
        if (tab[i] != 0) {
            if ((ch == "" && tab[i] < 0) || tab[i] < 0) {
                ch += '-';
            } else if (ch != "" && tab[i] > 0) {
                ch += '+';
            }
            if (Math.abs(tab[i]) > 1 || i == 0) {
                ch += Math.abs(tab[i]).toString();
            }
            if (i > 1) {
                ch += ("x^" + i.toString());
            } else if (i == 1) {
                ch += 'x';
            }
        }
    }
    return ch ;
  }

  function updateValues() {
    p = document.getElementById("p").value.trim();
    q = document.getElementById("q").value.trim();
    tab_p = parsePolynomial(p);
    tab_q = parsePolynomial(q) ;
  }

  function ADD() {
    updateValues();
    // Your code here
  }

  function MUL() {
    updateValues();
    document.getElementById("result").innerHTML =print_result(tab_p) ;
    console.log(tab_p);
    console.log(tab_q) ;
    }

  function DIV() {
    updateValues();
    // Your code here
  }

  document.getElementById("ADD").addEventListener("click", ADD);
  document.getElementById("MUL").addEventListener("click", MUL);
  document.getElementById("DIV").addEventListener("click", DIV);
});