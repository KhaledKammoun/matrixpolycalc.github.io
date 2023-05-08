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
  function valid_poly(){
    updateValues() ;
    const letters = Array.from({length: 26}, (_, i) => String.fromCharCode('a'.charCodeAt(0) + i)).filter(letter => letter !== 'x');
    if (p.length==0 || q.length==0)
        return false ;
    for (let i = 0; i < p.length; i++) {
        if (letters.includes(p[i].toLowerCase()))
            return false;
    }
    for (let i = 0; i < q.length; i++) {
        if (letters.includes(q[i].toLowerCase()))
            return false;
    }
    return true;
  }
  function deg(tab_1,tab_2) {
    updateValues();
    n1 = -1 ;
    n2 = -1 ;
    for (let i = 25; i >= 0; i--) {
        if (tab_1[i] != 0 && n1 == -1) {
            n1 = i;
        }
        if (tab_2[i] != 0 && n2 == -1) {
            n2 = i;
        }
        if (n1 != -1 && n2 != -1) {
            return [n1,n2]
        }
    }
    return [n1,n2]
  }
  function ADD() {
    updateValues();
    let test = valid_poly() ;
    if (test==false)
        document.getElementById("result").innerHTML = "I noticed that there is a syntax error in your polynomial.";
    else {
     let tab_sum = tab_p;
     for (let i = 0; i < 26; i++) {
         tab_sum[i] += tab_q[i];
     }
     document.getElementById("result").innerHTML =print_result(tab_sum) ;
    }
  }

  function MUL() {
    updateValues();
    let test = valid_poly() ;
    if (test==false)
        document.getElementById("result").innerHTML = "I noticed that there is a syntax error in your polynomial.";
    else{
        let tab_sum = new Array(26).fill(0);
        
        //deg of P and Q
        [n1,n2] = deg(tab_p,tab_q) ;
        for (let i = 0; i < n1 + n2 + 1; i++) {
            let x = 0;
            for (let j = 0; j < n2 + 1; j++) {
                if (i + j < n1 + n2 + 1) {
                    x += ((i + j - n2 < 0 ? 0 : tab_p[i + j - n2]) * tab_q[n2 - j]);
                }
            }
            tab_sum[i] = x;
        }
        document.getElementById("result").innerHTML =print_result(tab_sum) ;
     }
    }

  function DIV() {
    updateValues();
    let test = valid_poly() ;
    if (test==false)
        document.getElementById("result").innerHTML = "I noticed that there is a syntax error in your polynomial.";
    else {
        [n1,n2] = deg(tab_p,tab_q) ;
        if (n1<n2)
            document.getElementById("result").innerHTML = "The deg of the first polynomial is less than the deg of the second polynomial Try Again !!";
        else {
            let tab_Q = new Array(26).fill(0);
            let tab_R = new Array(26).fill(0);
            for (let i = n1 - n2; i >= 0; i--) {
                tab_Q[i] += tab_p[i + n2];
                for (let j = n2 - 1; j >= 0; j--) {
                    if (i + 1 + n2 - 1 - j <= n1 - n2) {
                        tab_Q[i] += (tab_Q[i + 1 + n2 - 1 - j] * (-tab_q[j]));
                    }
                }
            }
            for (let i = n2 - 1; i >= 0; i--) {
                tab_R[i] += tab_p[i];
                for (let j = n2 - 1; j >= 0; j--) {
                    if (n2 - 1 < i + 1 + n2 - 1 - j && i + 1 + n2 - 1 - j < n1) {
                        tab_R[i] += (tab_Q[i + 1 - 1 - j] * (-tab_q[j]));
                    }
                }
            }
            for (let i = 0; i < 26; i++) {
                tab_Q[i] = (tab_Q[i]/tab_q[n2]).toFixed(2);
            }

            for (let i = 0; i < 26; i++)
                tab_R[i] = (tab_R[i]/tab_q[n2]).toFixed(2);

            //tab_Q and tab_R' degrees
            [n_p,n_q] = deg(tab_Q,tab_R) ;
            
            document.getElementById("result").innerHTML ="A = (" + print_result(tab_q) + ')';
            if (n_p>0)
                document.getElementById("result").innerHTML += ('('+print_result(tab_Q) +')') ;
            if (n_q>0)
                document.getElementById("result").innerHTML +=(' + (' + print_result(tab_R) +')') ;
        }
    }
  }

  document.getElementById("ADD").addEventListener("click", ADD);
  document.getElementById("MUL").addEventListener("click", MUL);
  document.getElementById("DIV").addEventListener("click", DIV);
});