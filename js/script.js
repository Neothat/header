$(document).ready(function () {
    const $searchInput = $('.search-input');
    const $input = $searchInput.find('input');
    const $clearButton = $searchInput.find('.clear-button');
    const $icons = $searchInput.find('.icon');
    const $regionsBlock = $('.regions-block');
    const $regionItems = $('.regions-block li');
    const $clearRegionsButton = $regionsBlock.find('.clear-button');
    const $cityInput = $regionsBlock.find('.city-input');
    const $cityPicker = $('.city-picker-button');
    const $countryDisplay = $('.country-display');
    const $countriesBlock = $('.countries-block');
    const $backButtons = $('.countries-block .title-back-button, .cities-block .title-back-button');
    const $citiesBlock = $('.cities-block');

    function toggleElement($element, condition, className = 'active') {
        $element.toggleClass(className, condition);
    }

    function toggleClearButton() {
        toggleElement($clearButton, $input.val().length > 0, 'visible');
    }

    function toggleIconsColor() {
        toggleElement($icons, $input.val().length > 0, 'icon-colored');
    }

    $input.on('input', function () {
        toggleClearButton();
        toggleIconsColor();
        toggleElement($searchInput, $input.val().length >= 3, 'expanded');
    });

    $input.on('focus', function () {
        if ($input.val().length >= 3) {
            $searchInput.addClass('expanded');
        }
    });

    $clearButton.on('click', function () {
        $input.val('');
        toggleClearButton();
        $searchInput.removeClass('expanded');
        $icons.removeClass('icon-colored');
    });

    $clearRegionsButton.on('click', function () {
        $cityInput.val('');
    });

    $cityPicker.on('click', function () {
        toggleElement($regionsBlock, !$regionsBlock.hasClass('active'));
        toggleElement($cityPicker, !$cityPicker.hasClass('active'));
    });

    $countryDisplay.on('click', function (event) {
        event.stopPropagation();
        $regionsBlock.removeClass('active');
        $countriesBlock.addClass('active');
    });

    $regionItems.on('click', function (event) {
        event.stopPropagation();
        $regionsBlock.removeClass('active');
        $citiesBlock.addClass('active');
    });

    $backButtons.on('click', function (event) {
        event.stopPropagation();
        $(this).closest('.countries-block, .cities-block').removeClass('active');
        $regionsBlock.addClass('active');
    });

    $(document).on('click', function (event) {
        const $target = $(event.target);
        if (!$target.closest('.search-input, .search-suggestions').length) {
            $searchInput.removeClass('expanded');
        }
        if (!$target.closest('.city-picker-button, .regions-block, .countries-block, .cities-block').length) {
            $regionsBlock.removeClass('active');
            $countriesBlock.removeClass('active');
            $citiesBlock.removeClass('active');
            $cityPicker.removeClass('active');
        }
    });
});
