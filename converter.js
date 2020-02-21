import { LightningElement, track } from "lwc";

export default class converter extends LightningElement {
  @track convert = "";
  @track input = "1";
  @track input_cur_value = "INR";
  @track output_cur_value = "EUR";

  changeHandler(event) {
    this.convert = event.target.value;
  }

  inputchangeHandler(event) {
    this.input = event.target.value;
  }

  get input_cur_options() {
    return [
      { label: "INR", value: "INR" },
      { label: "USD", value: "USD" },
      { label: "CAD", value: "CAD" }
    ];
  }

  get output_cur_options() {
    return [
      { label: "EUR", value: "EUR" },
      { label: "AED", value: "AED" },
      { label: "CAD", value: "CAD" }
    ];
  }

  handleInputCurChange(event) {
    this.input_cur_value = event.detail.value;
  }

  handleOutputCurChange(event) {
    this.output_cur_value = event.detail.value;
  }

  handleCurrencyConversion() {
    let resp = {
      INR_EUR: 0.012824,
      INR_AED: 0.051097,
      INR_CAD: 0.018394,
      USD_EUR: 0.921815,
      USD_AED: 3.673204,
      USD_CAD: 1.32248,
      CAD_EUR: 0.697178,
      CAD_AED: 2.777901,
      CAD_CAD: 1
    };

    var lookup = this.input_cur_value + "_" + this.output_cur_value;
    window.console.log("lookup ",resp[lookup]);
    window.console.log("input ",this.input);
    var output = resp[lookup] * parseInt(this.input);
    window.console.log("output ",output);
    this.convert = output + '';
  }
  // Making Callout using Fetch
  handleCurrencyConversion_API() {
    window.console.log("called handleCurrencyConversion");
    fetch(
      "https://free.currconv.com/api/v7/convert?q=" +
        this.input_cur_value +
        "_" +
        this.output_cur_value +
        "&compact=ultra&apiKey=e83323e160081f23cb49", // End point URL
      {
        // Request type
        method: "GET",

        headers: {
          // content type
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => {
        return response.json(); // returning the response in the form of JSON
      })
      .then(jsonResponse => {
        window.console.log("jsonResponse ===> " + JSON.stringify(jsonResponse));
        // retriving the response data
      })
      .catch(error => {
        window.console.log("callout error ===> " + JSON.stringify(error));
      });
  }
}
