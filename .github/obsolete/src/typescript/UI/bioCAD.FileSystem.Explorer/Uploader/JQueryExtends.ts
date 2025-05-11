/// <reference path="./ProgressMeter.ts" />

// The progress meter functionality is available as a series of plugins.
// You can put this code in a separate file if you want to keep things tidy.
(function ($) {

    // Creating a number of jQuery plugins that you can use to
    // initialize and control the progress meters.
    (<any>$.fn).progressInitialize = function () {

        // This function creates the necessary markup for the progress meter
        // and sets up a few event listeners.

        // Loop through all the buttons:
        return this.each(function () {

            var button = $(this), progress: number = 0;

            // Extract the data attributes into the options object.
            // If they are missing, they will receive default values.
            var options = $.extend({
                type: 'background-horizontal',
                loading: 'Uploading..',
                finished: 'Done!'
            }, button.data());

            // Add the data attributes if they are missing from the element.
            // They are used by our CSS code to show the messages
            button.attr({
                'data-loading': options.loading,
                'data-finished': options.finished
            });

            // Add the needed markup for the progress bar to the button
            var bar = $(`<span class="tz-bar ${options.type}">`).appendTo(button);

            // The progress event tells the button to update the progress bar
            button.on('progress', function (e, val, absolute, finish) {

                if (!button.hasClass('in-progress')) {

                    // This is the first progress event for the button (or the
                    // first after it has finished in a previous run). Re-initialize
                    // the progress and remove some classes that may be left.
                    bar.show();
                    progress = 0;
                    button.removeClass('finished').addClass('in-progress')
                }

                // val, absolute and finish are event data passed by the progressIncrement
                // and progressSet methods that you can see near the end of this file.
                if (absolute) {
                    progress = val;
                } else {
                    progress += val;
                }

                if (progress >= 100) {
                    progress = 100;
                }

                if (finish) {

                    button.removeClass('in-progress').addClass('finished');
                    bar.delay(500)
                        .fadeOut(function () {

                            // Trigger the custom progress-finish event
                            button.trigger('progress-finish');
                            setProgress(0);
                        });
                }

                setProgress(progress);
            });

            function setProgress(percentage) {
                bar.filter('.background-horizontal,.background-bar').width(percentage + '%');
                bar.filter('.background-vertical').height(percentage + '%');
            }
        });
    };

    // progressStart simulates activity on the progress meter. Call it first,
    // if the progress is going to take a long time to finish.
    (<any>$.fn).progressStart = function () {

        var button = this.first(),
            last_progress = new Date().getTime();

        if (button.hasClass('in-progress')) {
            // Don't start it a second time!
            return this;
        }

        button.on('progress', function () {
            last_progress = new Date().getTime();
        });

        return button.progressIncrement(0);
    };

    (<any>$.fn).progressFinish = function () {
        return this.first().progressSet(100);
    };

    (<any>$.fn).progressIncrement = function (val) {
        var button = this.first();

        val = val || 10;
        button.trigger('progress', [val]);

        return this;
    };

    (<any>$.fn).progressSet = function (val) {
        var finish = false;

        val = val || 10;

        if (val >= 100) {
            finish = true;
        }

        return this.first().trigger('progress', [val, true, finish]);
    };
})(jQuery);