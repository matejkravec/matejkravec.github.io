/* ================================================
   SPŠE PREŠOV - JAVASCRIPT INTERAKTIVITA
   Autor: Matej Kravec
   ================================================ */

$(document).ready(function() {
    'use strict';

    // ================================================
    // BURGER MENU PRE MOBILE
    // ================================================

    // Prepínanie menu pri kliknutí na tlačidlo
    $('#menuToggle').on('click', function() {
        $('#mainNav').toggleClass('active');
    });

    // Zatvorenie menu pri kliknutí na odkaz v menu
    $('#mainNav a').on('click', function() {
        $('#mainNav').removeClass('active');
    });

    // Zatvorenie menu pri kliknutí mimo menu
    $(document).on('click', function(event) {
        if (!$(event.target).closest('header').length) {
            $('#mainNav').removeClass('active');
        }
    });

    // ================================================
    // SLIDER S NOVINKAMI
    // ================================================

    var sliderData = [
        {
            date: '10. Jan',
            icon: '🚀',
            title: 'Deň otvorených dverí!',
            text: 'Príď sa pozrieť do našich labákov a zaži atmosféru školy na vlastnej koži.'
        },
        {
            date: '05. Jan',
            icon: '💻',
            title: 'Nový web',
            text: 'Spustili sme novú verziu webu pre lepší prehľad o tvojom štúdiu.'
        },
        {
            date: 'Dôležité',
            icon: '⏰',
            title: 'Termíny prihlášok',
            text: 'Nezabudni na termíny prihlášok, tvoja cesta k IT začína tu!'
        },
        {
            date: '15. Feb',
            icon: '📚',
            title: 'Prípravné kurzy',
            text: 'Prípravné kurzy na prijímačky začínajú vo februári. Nezmeš si to!'
        }
    ];

    var currentSlide = 0;

    // Inicializácia slidera
    function initSlider() {
        if ($('#sliderContent').length === 0) return;

        renderSlide(currentSlide);
        renderDots();
    }

    // Zobrazenie snímky
    function renderSlide(index) {
        var slide = sliderData[index];
        var html = '<strong>' + slide.date + ':</strong> ' +
                   slide.icon + ' ' +
                   '<em>' + slide.title + ':</em> ' +
                   slide.text;
        
        $('#sliderContent').html(html);
        updateDots();
    }

    // Vykreslenie bodov (dots)
    function renderDots() {
        var dotsHtml = '';
        for (var i = 0; i < sliderData.length; i++) {
            dotsHtml += '<span class="dot ' + (i === 0 ? 'active' : '') + '" data-index="' + i + '"></span>';
        }
        $('#sliderDots').html(dotsHtml);

        // Event listenery na bodoch
        $('.dot').on('click', function() {
            currentSlide = $(this).data('index');
            renderSlide(currentSlide);
        });
    }

    // Aktualizácia bodov pri zmene snímky
    function updateDots() {
        $('.dot').removeClass('active').eq(currentSlide).addClass('active');
    }

    // Nasledujúca snímka
    $('#sliderNext').on('click', function() {
        currentSlide = (currentSlide + 1) % sliderData.length;
        renderSlide(currentSlide);
    });

    // Predchádzajúca snímka
    $('#sliderPrev').on('click', function() {
        currentSlide = (currentSlide - 1 + sliderData.length) % sliderData.length;
        renderSlide(currentSlide);
    });

    // Automatické posúvanie slidera každých 5 sekúnd
    setInterval(function() {
        $('#sliderNext').click();
    }, 5000);

    // ================================================
    // VALIDÁCIA A ODOSLANIE FORMULÁRA
    // ================================================

    $('#contactForm').on('submit', function(e) {
        e.preventDefault();

        // Zmazanie predchádzajúcich chybových správ
        $('.error-message').empty();
        
        // Validácia formulára
        var isValid = validateForm();

        if (isValid) {
            // Simulácia odoslania na server
            $.ajax({
                type: 'POST',
                url: '#', // V reálnom prostredí by bol URL na server
                data: $(this).serialize(),
                success: function() {
                    $('#submitMessage')
                        .addClass('success')
                        .removeClass('error')
                        .text('✓ Ďakujeme! Vaša správa bola úspešne odoslaná. Ozveme sa vám čo najskôr.');
                    
                    // Reset formulára
                    $('#contactForm')[0].reset();
                    
                    // Skrytie správy po 5 sekundách
                    setTimeout(function() {
                        $('#submitMessage').fadeOut();
                    }, 5000);
                },
                error: function() {
                    $('#submitMessage')
                        .removeClass('success')
                        .addClass('error')
                        .text('⚠ Chyba pri odosielaní. Skúste znova neskôr.');
                }
            });
        }
    });

    // Validácia jednotlivých polí
    function validateForm() {
        var isValid = true;

        // Validácia mena
        var meno = $('#meno').val().trim();
        if (meno.length < 5) {
            $('#menoError').text('Meno musí mať aspoň 5 znakov.');
            isValid = false;
        } else if (meno.length > 128) {
            $('#menoError').text('Meno môže mať maximálne 128 znakov.');
            isValid = false;
        }

        // Validácia emailu
        var email = $('#email').val().trim();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#emailError').text('Prosím, zadajte platnú e-mailovú adresu.');
            isValid = false;
        } else if (email.length > 256) {
            $('#emailError').text('E-mail môže mať maximálne 256 znakov.');
            isValid = false;
        }

        // Validácia telefónu (ak je vyplnený)
        var tel = $('#tel').val().trim();
        if (tel.length > 0 && tel.length < 7) {
            $('#telError').text('Telefónne číslo musí mať aspoň 7 znakov.');
            isValid = false;
        }

        // Validácia predmetu
        var predmet = $('#predmet').val().trim();
        if (predmet.length < 3) {
            $('#predmetError').text('Predmet musí mať aspoň 3 znaky.');
            isValid = false;
        } else if (predmet.length > 128) {
            $('#predmetError').text('Predmet môže mať maximálne 128 znakov.');
            isValid = false;
        }

        // Validácia správy
        var sprava = $('#sprava').val().trim();
        if (sprava.length < 5) {
            $('#spravaError').text('Správa musí mať aspoň 5 znakov.');
            isValid = false;
        }

        return isValid;
    }

    // Real-time validácia pri zmene hodnoty
    $('#meno').on('blur', function() {
        var value = $(this).val().trim();
        if (value.length < 5 && value.length > 0) {
            $('#menoError').text('Meno musí mať aspoň 5 znakov.');
        } else {
            $('#menoError').empty();
        }
    });

    $('#email').on('blur', function() {
        var value = $(this).val().trim();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
            $('#emailError').text('Prosím, zadajte platnú e-mailovú adresu.');
        } else {
            $('#emailError').empty();
        }
    });

    $('#predmet').on('blur', function() {
        var value = $(this).val().trim();
        if (value.length < 3 && value.length > 0) {
            $('#predmetError').text('Predmet musí mať aspoň 3 znaky.');
        } else {
            $('#predmetError').empty();
        }
    });

    $('#sprava').on('blur', function() {
        var value = $(this).val().trim();
        if (value.length < 5 && value.length > 0) {
            $('#spravaError').text('Správa musí mať aspoň 5 znakov.');
        } else {
            $('#spravaError').empty();
        }
    });

    // ================================================
    // INICIALIZÁCIA
    // ================================================

    initSlider();

    // ================================================
    // SMOOTH SCROLL
    // ================================================

    $('a[href*="#"]').on('click', function(e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 1000);
        }
    });

    // ================================================
    // EFEKT DYMOVÉHO VIDEA
    // ================================================

    // Efekt pri najetí myši na foto
    $('.photo-card').on('mouseenter', function() {
        $(this).css('transform', 'translateY(-5px)');
    }).on('mouseleave', function() {
        $(this).css('transform', 'translateY(0)');
    });

    // ================================================
    // CONSOLE LOG (DEBUG)
    // ================================================

    console.log('✓ SPŠE Prešov - JavaScript načítaný úspešne');
});

// ================================================
// SUPPORT PRE STARŠIE PREHLIADAČE
// ================================================

if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === searchElement) {
                return true;
            }
        }
        return false;
    };
}
