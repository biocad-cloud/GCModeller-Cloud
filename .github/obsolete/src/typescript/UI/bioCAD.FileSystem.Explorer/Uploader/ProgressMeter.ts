$(document).ready(function () {

    // Convert all the links with the progress-button class to
    // actual buttons with progress meters.
    // You need to call this function once the page is loaded.
    // If you add buttons later, you will need to call the function only for them.
    (<any>$('.progress-button')).progressInitialize();

    // Listen for clicks on the first three buttons, and start
    // the progress animations
    $('#submitButton').click(function (e) {
        e.preventDefault();

        // This function will show a progress meter for
        // the specified amount of time
        (<any>$(this)).progressTimed(2);
    });

    $('#actionButton').click(function (e) {
        e.preventDefault();
        (<any>$(this)).progressTimed(2);
    });

    $('#generateButton').one('click', function (e) {
        e.preventDefault();

        // It can take a callback
        var button: any = $(this);

        button.progressTimed(3, function () {

            // In this callback, you can set the href attribute of the button
            // to the URL of the generated file. For the demo, we will only
            // set up a new event listener that alerts a message.
            button.click(function () {
                alert('Showing how a callback works!');
            });
        });
    });

    // Custom progress handling
    var controlButton: any = $('#controlButton');

    $('.command.increment').click(function () {
        // Increment the progress bar with 10%. Pass a number
        // as an argument to increment with a different amount.
        controlButton.progressIncrement();
    });

    $('.command.set-to-1').click(function () {
        // Set the progress meter to the specified percentage
        controlButton.progressSet(1);
    });

    $('.command.set-to-50').click(function () {
        controlButton.progressSet(50);
    });

    $('.command.finish').click(function () {
        // Set the progress meter to 100% and show the done text.
        controlButton.progressFinish();
    });
});