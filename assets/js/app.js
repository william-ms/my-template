window.onload = () => {
    const el_html = document.querySelector("html");
    const el_blur = document.getElementById("blur");
    const el_navbar = document.getElementById("navbar");

    //:::::::::::::::::::::::::::: VALIDATE THEME :::::::::::::::::::::::::::://
    if (el_html.dataset.headerTheme == "light" && el_html.dataset.navbarTheme == "light" && el_html.dataset.contentTheme == "light") {
        el_html.dataset.theme = "light";
    } else if (el_html.dataset.headerTheme == "dark" && el_html.dataset.navbarTheme == "dark" && el_html.dataset.contentTheme == "dark") {
        el_html.dataset.theme = "dark";
    }

    //::::::::::::::::::::::::::::: CLICK ON BLUR :::::::::::::::::::::::::::://
    el_blur.addEventListener("click", function () {
        if (el_navbar.classList.contains("show")) {
            el_navbar.classList.remove("show");
            el_blur.classList.remove("show");
        }
    });

    //::::::::::::::::::::::::::::: TOGGLE NAVBAR :::::::::::::::::::::::::::://
    document.querySelectorAll(".btn-toggle-navbar").forEach(function (btn) {
        btn.addEventListener("click", function () {
            if (document.documentElement["clientWidth"] <= 768) {
                if (el_html.dataset.navbarSize == "small") {
                    el_html.dataset.navbarSize = "large";
                }

                el_navbar.classList.toggle("show");
                el_blur.classList.toggle("show");
            } else {
                el_html.dataset.navbarSize == "large" ? (el_html.dataset.navbarSize = "small") : (el_html.dataset.navbarSize = "large");
            }
        });
    });

    //::::::::::::::::::::::::::::: SWITCH THEME ::::::::::::::::::::::::::::://
    document.getElementById("btn-switch-theme").addEventListener("click", function () {
        if (el_html.dataset.theme == "light") {
            el_html.dataset.theme = "dark";
            el_html.dataset.navbarTheme = "dark";
        } else if (el_html.dataset.theme == "dark") {
            el_html.dataset.theme = "light";
            el_html.dataset.navbarTheme = "light";
        }
    });

    //::::::::::::::::::::::::::: NAVBAR - DROPDOWN :::::::::::::::::::::::::://
    document.querySelectorAll(".nav-link").forEach(function (nav_link) {
        nav_link.addEventListener("click", function (e) {
            let nav_submenu = nav_link.nextElementSibling;

            if (nav_submenu == null) {
                return;
            }

            e.preventDefault();

            if (el_html.dataset.navbarSize != "large") {
                return;
            }

            let nav_item = nav_link.parentElement;

            nav_item.classList.toggle("dropdown");

            if (nav_item.classList.contains("dropdown")) {
                let nav_submenu_height = 0;

                nav_submenu.querySelectorAll("li").forEach((nav_subitem) => {
                    nav_submenu_height += nav_subitem.offsetHeight;
                });

                nav_submenu.style.maxHeight = nav_submenu_height + "px";

                remove_dropdown_from_siblings(nav_item);
            } else {
                nav_submenu.style.maxHeight = 0;
            }
        });
    });

    function remove_dropdown_from_siblings(nav_item) {
        let nav_parent = nav_item.parentElement.parentElement;

        const nav_siblings = nav_parent.querySelectorAll(".nav-item");

        for (let i = 0; i < nav_siblings.length; i++) {
            const nav_sibling = nav_siblings[i];

            if (nav_sibling !== nav_item && nav_sibling.classList.contains("dropdown")) {
                nav_sibling.classList.remove("dropdown");
                nav_sibling.querySelector("ul").style.maxHeight = 0;

                const nested_dropdowns = nav_sibling.querySelectorAll(".dropdown");

                for (const nested_dropdown of nested_dropdowns) {
                    nested_dropdown.classList.remove("dropdown");
                    nested_dropdown.querySelector("ul").style.maxHeight = 0;
                }

                break;
            }
        }
    }
};
