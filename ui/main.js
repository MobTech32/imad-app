{\rtf1\ansi\ansicpg1252\deff0\deflang1033{\fonttbl{\f0\fnil\fcharset0 Calibri;}}
{\*\generator Msftedit 5.41.21.2510;}\viewkind4\uc1\pard\sa200\sl276\slmult1\lang9\f0\fs22 function loadLoginForm () \{\par
    var loginHtml = `\par
        <h3>Login/Register to unlock awesome features</h3>\par
        <input type="text" id="username" placeholder="username" />\par
        <input type="password" id="password" />\par
        <br/><br/>\par
        <input type="submit" id="login_btn" value="Login" />\par
        <input type="submit" id="register_btn" value="Register" />\par
        `;\par
    document.getElementById('login_area').innerHTML = loginHtml;\par
    \par
    // Submit username/password to login\par
    var submit = document.getElementById('login_btn');\par
    submit.onclick = function () \{\par
        // Create a request object\par
        var request = new XMLHttpRequest();\par
        \par
        // Capture the response and store it in a variable\par
        request.onreadystatechange = function () \{\par
          if (request.readyState === XMLHttpRequest.DONE) \{\par
              // Take some action\par
              if (request.status === 200) \{\par
                  submit.value = 'Sucess!';\par
              \} else if (request.status === 403) \{\par
                  submit.value = 'Invalid credentials. Try again?';\par
              \} else if (request.status === 500) \{\par
                  alert('Something went wrong on the server');\par
                  submit.value = 'Login';\par
              \} else \{\par
                  alert('Something went wrong on the server');\par
                  submit.value = 'Login';\par
              \}\par
              loadLogin();\par
          \}  \par
          // Not done yet\par
        \};\par
        \par
        // Make the request\par
        var username = document.getElementById('username').value;\par
        var password = document.getElementById('password').value;\par
        console.log(username);\par
        console.log(password);\par
        request.open('POST', '/login', true);\par
        request.setRequestHeader('Content-Type', 'application/json');\par
        request.send(JSON.stringify(\{username: username, password: password\}));  \par
        submit.value = 'Logging in...';\par
        \par
    \};\par
    \par
    var register = document.getElementById('register_btn');\par
    register.onclick = function () \{\par
        // Create a request object\par
        var request = new XMLHttpRequest();\par
        \par
        // Capture the response and store it in a variable\par
        request.onreadystatechange = function () \{\par
          if (request.readyState === XMLHttpRequest.DONE) \{\par
              // Take some action\par
              if (request.status === 200) \{\par
                  alert('User created successfully');\par
                  register.value = 'Registered!';\par
              \} else \{\par
                  alert('Could not register the user');\par
                  register.value = 'Register';\par
              \}\par
          \}\par
        \};\par
        \par
        // Make the request\par
        var username = document.getElementById('username').value;\par
        var password = document.getElementById('password').value;\par
        console.log(username);\par
        console.log(password);\par
        request.open('POST', '/create-user', true);\par
        request.setRequestHeader('Content-Type', 'application/json');\par
        request.send(JSON.stringify(\{username: username, password: password\}));  \par
        register.value = 'Registering...';\par
    \par
    \};\par
\}\par
\par
function loadLoggedInUser (username) \{\par
    var loginArea = document.getElementById('login_area');\par
    loginArea.innerHTML = `\par
        <h3> Hi <i>$\{username\}</i></h3>\par
        <a href="/logout">Logout</a>\par
    `;\par
\}\par
\par
function loadLogin () \{\par
    // Check if the user is already logged in\par
    var request = new XMLHttpRequest();\par
    request.onreadystatechange = function () \{\par
        if (request.readyState === XMLHttpRequest.DONE) \{\par
            if (request.status === 200) \{\par
                loadLoggedInUser(this.responseText);\par
            \} else \{\par
                loadLoginForm();\par
            \}\par
        \}\par
    \};\par
    \par
    request.open('GET', '/check-login', true);\par
    request.send(null);\par
\}\par
\par
function loadArticles () \{\par
        // Check if the user is already logged in\par
    var request = new XMLHttpRequest();\par
    request.onreadystatechange = function () \{\par
        if (request.readyState === XMLHttpRequest.DONE) \{\par
            var articles = document.getElementById('articles');\par
            if (request.status === 200) \{\par
                var content = '<ul>';\par
                var articleData = JSON.parse(this.responseText);\par
                for (var i=0; i< articleData.length; i++) \{\par
                    content += `<li>\par
                    <a href="/articles/$\{articleData[i].title\}">$\{articleData[i].heading\}</a>\par
                    ($\{articleData[i].date.split('T')[0]\})</li>`;\par
                \}\par
                content += "</ul>"\par
                articles.innerHTML = content;\par
            \} else \{\par
                articles.innerHTML('Oops! Could not load all articles!')\par
            \}\par
        \}\par
    \};\par
    \par
    request.open('GET', '/get-articles', true);\par
    request.send(null);\par
\}\par
\par
\par
// The first thing to do is to check if the user is logged in!\par
loadLogin();\par
\par
// Now this is something that we could have directly done on the server-side using templating too!\par
loadArticles();\par
}
