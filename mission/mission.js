const themeSelector = document.querySelector("select");
function changeTheme() {
    // check to see what the current value of our select is.
    // The current value is conveniently found in themeSelector.value!
    if (themeSelector.value == "dark") {
        document.body.setAttribute("class", "dark");
        document.querySelector(".logo").setAttribute("src", "byui-logo_white.png")
    } else {
        document.body.removeAttribute("class");
        document.querySelector(".logo").setAttribute("src", "byui-logo_blue.png")
    }

    
    // if the value is dark then:
    // add the dark class to the body
    // change the source of the logo img to point to the white logo.
    // otherwise
    // remove the dark class
    // make sure the logo src is the blue logo.
    }

themeSelector.addEventListener("change", changeTheme);