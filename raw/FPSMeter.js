/*

Plugin that adds a simple FPS meter.

Version : 1f - Raw


Copyright (c) 2024 Desert Lake

Licensed under MIT (https://github.com/crystal2d/extras/blob/main/LICENSE.md)

*/


/**
 * Class for managing the meter.
 * 
 * @public
 * @static
 * @class
 */
class FPSMeter
{
    // Private Static Properties

    static #enabled = false;
    static #ms = false
    static #time = 0;

    static #text = null;


    // Static Properties

    /**
     * Enables/disables the meter display.
     * 
     * @memberof FPSMeter
     * 
     * @public
     * @static
     * @type {boolean}
     */
    static get enabled ()
    {
        return this.#enabled;
    }

    /**
     * Enables/disables the meter display.
     * 
     * @memberof FPSMeter
     * 
     * @public
     * @static
     * @type {boolean}
     */
    static set enabled (value)
    {
        this.SetActive(value);
    }

    /**
     * Toggles the display in milliseconds mode.
     * 
     * @memberof FPSMeter
     * 
     * @public
     * @static
     * @type {boolean}
     */
    static get msMode ()
    {
        return this.#ms;
    }

    /**
     * Toggles the display in milliseconds mode.
     * 
     * @memberof FPSMeter
     * 
     * @public
     * @static
     * @type {boolean}
     */
    static set msMode (value)
    {
        this.#ms = value;

        this.#time = 0.5;
    }


    // Static Methods

    /**
     * Enables/disables the meter display.
     * 
     * @memberof FPSMeter
     * 
     * @public
     * @static
     * @method
     * 
     * @param {boolean} state - New state to take.
     */
    static SetActive (state)
    {
        if (state === this.#enabled) return;

        if (this.#text == null)
        {
            this.#text = document.createElement("div");

            this.#text.style.position = "absolute";
            this.#text.style.background = "#ffffff7f";
            this.#text.style.margin = "4px";
            this.#text.style.fontSize = "20px";
            this.#text.style.minWidth = "67px";
            this.#text.style.height = "24px";
            this.#text.style.padding = "8px 6px";
            this.#text.style.whiteSpace = "pre-wrap";

            document.body.append(this.#text);
        }
        else this.#text.style.display = state ? "block" : "none";

        if (state) this.#time = 0.5;

        this.#enabled = state;
    }

    /**
     * Updates the meter and its values.
     * 
     * @memberof FPSMeter
     * 
     * @public
     * @static
     * @method
     */
    static Update ()
    {
        if (!this.#enabled) return;

        if (this.#time < 0.5)
        {
            this.#time += Time.deltaTime;
            
            return;
        }
        
        this.#time = 0;

        if (this.#ms)
        {
            const ms = parseInt(
                Math.max(
                    (Time.deltaTime || Time.maximumDeltaTime),
                    1 / Application.targetFrameRate
                ) * 1000
            );
            
            this.#text.textContent = `ms  ${ms}`;

            return;
        }
        
        const fps = Math.min(
            parseInt(1 / (Time.deltaTime || Time.maximumDeltaTime)),
            Application.targetFrameRate
        );
        
        this.#text.textContent = `FPS ${fps}`;
    }
}