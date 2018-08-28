import * as React from "react";
import { PropertyControls, ControlType } from "framer";
import axios from "axios";

//lets install and import axios for the http requests -> In File > Show Project Folder
// Lets create some UI controls and see how to use enums...

// Define type of property
interface Props {
  text: string;
  textType: "countries" | "names" | "article";
  width: number;
  height: number;
  color: string;
  fontWeight: number;
  fontSize: number;
}

export class test extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    text: "Hello World!",
    textType: "countries",
    width: 250,
    height: 100,
    color: "#000",
    fontSize: 14,
    fontWeight: 900
  };

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    textType: {
      type: ControlType.Enum,
      title: "Text Type",
      options: ["countries", "names", "article"],
      optionTitles: ["Countries", "Names", "Article"]
    },
    fontSize: { type: ControlType.Number, title: "Font Size" },
    fontWeight: { type: ControlType.Number, title: "Font Weight" },
    color: { type: ControlType.Color, title: "Text Color" }
  };

  //lets setup some states...lets add states for the other text types also
  state = {
    countries: "",
    names: "",
    article: ""
  };

  //lets make a http request.
  // to bypass this error let use this website -
  componentDidMount() {
    let URLCountries = `${"https://cors-anywhere.herokuapp.com/"}https://listsdesign.herokuapp.com/lists/countries.json`;
    axios.get(URLCountries).then(data => {
      let randomNum = Math.floor(Math.random() * 99);
      //   console.log(data.data.Countries[randomNum].data);
      //   //console is showing an array...100 in number. lets check the first array
      //   //to get a random country everytime we have to generate a random number in between //0-100 everytime this is rendered.
      //   // we need to now render this in framer...

      let countries = data.data.Countries[randomNum].data;
      this.setState({ countries });
    });

    let URLNames = `${"https://cors-anywhere.herokuapp.com/"}https://listsdesign.herokuapp.com/lists/names.json`;
    axios.get(URLNames).then(data => {
      let randomNum = Math.floor(Math.random() * 99);
      //   console.log(data.data.Names[randomNum].data);
      let names = data.data.Names[randomNum].data;
      this.setState({ names });
    });

    let URLArticles = `${"https://cors-anywhere.herokuapp.com/"}https://listsdesign.herokuapp.com/lists/articlesworld-en.json`;
    axios.get(URLArticles).then(data => {
      let randomNum = Math.floor(Math.random() * 4);
      console.log(data.data["Articles (World)"][randomNum].data);
      let article = data.data["Articles (World)"][randomNum].data;
      this.setState({ article });
    });
  }

  render() {
    // lets us now hook the different texttypes with the prop text so that we can render the text type in Framer

    let { countries, names, article } = this.state;
    let {
      text,
      textType,
      width,
      height,
      color,
      fontSize,
      fontWeight
    } = this.props;

    // whatever is outside the switch statement will be considered the default choice.
    // so by default countries are rendered
    text = countries;

    switch (textType) {
      case "names":
        text = names;
        break;
      // since we have destructed the states and props we are writting it like this
      //this.props.text = this.state.names
      case "article":
        text = article;
        break;
    }

    return (
      <div
        style={{
          width,
          height,
          color,
          fontSize,
          fontWeight,
          overflow: "hidden"
        }}
      >
        {text}
      </div>
    );
  }
}
