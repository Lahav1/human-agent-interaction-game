import React, {Component} from 'react';
import SnickersPicture from '../assets/snickers.jpg'
import ShirtPicture from '../assets/shirt.jpg'
import WatchPicture from '../assets/watch.jpg'
import JeansPicture from '../assets/jeans.jpg'
import SunglassesPicture from '../assets/sunglasses.jpg'
import DressPicture from '../assets/‏‏dress.jpg'
import classes from './ItemSelector.module.css';
import axios from '../axios';

const snickersPrices    = [70, 65, 60, 55, 80]
const shirtPrices       = [70, 100, 90, 55, 115]
const dressPrices       = [190, 150, 120, 170, 185]
const jeansPrices       = [120, 99, 110, 85, 115]
const sunglassesPrices  = [60, 85, 75, 70, 99]
const watchPrices       = [120, 130, 140, 99, 135]

class ItemSelector extends Component {
    state = {
        chosenItems: [],
        started: false,
        finished: false,
        submitted: false,
        gender: "",
        age: 0
    }

    handlePurchase = () => {
        let newBudget = this.state.budget - this.state.prices[this.state.currentOffer]
        let newItem = this.state.currentItem + 1;
        let newChosenItems = this.state.chosenItems
        newChosenItems.push(this.state.currentOffer) 
        this.setState({chosenItems: newChosenItems})
        if (newItem == 1) {
            this.setState({
                currentItem: newItem,
                currentOffer: 0,
                budget: newBudget,    
                title:"Shirt",
                initialPrice: 120,
                prices: shirtPrices
            })    
        }
        else if (newItem == 2) {
            this.setState({
                currentItem: newItem,
                currentOffer: 0,
                budget: newBudget,    
                title:"Dress",
                initialPrice: 200,
                prices: dressPrices
            })    
        }
        else if (newItem == 3) {
            this.setState({
                currentItem: newItem,
                currentOffer: 0,
                budget: newBudget,    
                title:"Jeans",
                initialPrice: 145,
                prices: jeansPrices
            })    
        }
        else if (newItem == 4) {
            this.setState({
                currentItem: newItem,
                currentOffer: 0,
                budget: newBudget,    
                title:"Sunglasses",
                initialPrice: 100,
                prices: sunglassesPrices
            })    
        }
        else if (newItem == 5) {
            this.setState({
                currentItem: newItem,
                currentOffer: 0,
                budget: newBudget,    
                title:"Watch",
                initialPrice: 150,
                prices: watchPrices
            })    
        }
        else if (newItem == 6) {
            this.setState({
                budget: newBudget,
                finished: true
            })
        }
    }

    handleNext = () => {
        let updated = this.state.currentOffer + 1;
        this.setState({currentOffer: updated});
    }

    handleReady = () => {
        this.setState({started: true});
    }

    handleSubmit = () => {
        this.setState({submitted: true})
        const form = {
            gender: this.state.gender,
            age: this.state.age,
            snickers: snickersPrices[this.state.chosenItems[0]],
            shirt: shirtPrices[this.state.chosenItems[1]],
            dress: dressPrices[this.state.chosenItems[2]],
            jeans: jeansPrices[this.state.chosenItems[3]],
            sunglasses: sunglassesPrices[this.state.chosenItems[4]],
            watch: watchPrices[this.state.chosenItems[5]],
            budget: this.state.budget
        }
        axios.post('/forms.json', form)
    }

    ageChanged = (event) => {
        this.setState({age: event.target.value});
    }
    
    genderChanged = (event) => {
        this.setState({gender: event.target.value});
    }

    componentWillMount() {
        this.setState({currentOffer: 0,
                        currentItem: 0,
                        budget: 750,    
                        title:"Snickers",
                        initialPrice: 85,
                        prices: snickersPrices
                    })
    }

    render() {
        let prices = []
        prices.push(this.state.prices[0])
        prices.push(this.state.prices[1])
        prices.push(this.state.prices[2])
        prices.push(this.state.prices[3])
        prices.push(this.state.prices[4])
        let pic = null
        if (this.state.title == "Snickers") {
            pic = <img src={SnickersPicture} height={150} width={250}></img>
        }
        else if (this.state.title == "Shirt") {
            pic = <img src={ShirtPicture} height={200} width={200}></img>
        }
        else if (this.state.title == "Watch") {
            pic = <img src={WatchPicture} height={180} width={110}></img>
        }
        else if (this.state.title == "Jeans") {
            pic = <img src={JeansPicture} height={180} width={180}></img>
        }
        else if (this.state.title == "Sunglasses") {
            pic = <img src={SunglassesPicture} height={180} width={180}></img>
        }
        else if (this.state.title == "Dress") {
            pic = <img src={DressPicture} height={180} width={180}></img>
        }
        let bottom = (
            <div>
                <p className={classes.CurrentPrice}><b>₪{prices[this.state.currentOffer]}</b></p>
                <button className={classes.PurchaseButton} onClick={this.handlePurchase}>Purchase</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={this.handleNext}>Another Price</button>
            </div>
        )
        if (this.state.currentOffer == (prices.length - 1)) {
            bottom = (
                <div>
                    <p className={classes.CurrentPrice}><b>₪{prices[this.state.currentOffer]}</b></p>
                    <p className={classes.Message}>This is the final price. Please purchase to continue.</p>
                    <button className={classes.PurchaseButton} onClick={this.handlePurchase}>Purchase</button>
                </div>
            )
        }
        let content = (
            <div className={classes.Introduction}>
                <h1>Welcome</h1>
                <p>As a part of the "Human-Agent Interaction" course at Bar-Ilan University,<br/> Computer Science department,
                we invite you to take part in a short experiment:<br/>
                You get a budget of <b>₪750</b>.<br/> You will be introduced to 6 different items which you will purchase.<br/>
                For every item you can choose between two options:<br/> Get a <b>new price</b> or <b>purchase</b>.<br/>
                The price offers might end at any moment, without a warning.<br/>
                If you reach the last offer you will have to pay the marked price.<br/>
                Your goal is to purchase the items with minimum cost. <br/>
                <b>Thanks, Mishel Fuzailov and Lahav Amsalem</b></p>
                <label for='age'>Your age: </label>
                <input id='age' type='text' onChange={this.ageChanged} style={{width:50}}/>
                <br/>
                <label for='gender'>Gender: </label>
                <select id='gender' type='text' onChange={this.genderChanged}>
                    <option value="empty"></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <br/><br/>
                <button className={classes.Button} onClick={this.handleReady}>Ready</button>
            </div>
        )
        if (this.state.started) {
            content = (
                <div>
                    <h4>Your current budget: <span className={classes.Budget}>₪{this.state.budget}</span></h4>
                    <h1>{this.state.title}</h1>
                    {pic}
                    <p><strike>₪{this.state.initialPrice}</strike></p>
                    {bottom}
                </div>
            )
        }
        if (this.state.finished) {
            content = (
                <div>
                    <h1>Thanks for your participation!</h1>
                    <h3>Here's your reception:</h3>
                    <p><b>Snickers:</b> ₪{snickersPrices[this.state.chosenItems[0]]} </p>
                    <p><b>Shirt:</b> ₪{shirtPrices[this.state.chosenItems[1]]} </p>
                    <p><b>Dress:</b> ₪{dressPrices[this.state.chosenItems[2]]} </p>
                    <p><b>Jeans:</b> ₪{jeansPrices[this.state.chosenItems[3]]} </p>
                    <p><b>Sunglasses:</b> ₪{sunglassesPrices[this.state.chosenItems[4]]} </p>
                    <p><b>Watch:</b> ₪{watchPrices[this.state.chosenItems[5]]} </p>
                    <h4 className={classes.Message}>You got ₪{this.state.budget} left in your budget.</h4>
                    <br/>
                    <button className={classes.SubmitButton} onClick={this.handleSubmit}>Submit</button>
                </div> 
            )
        }
        if (this.state.submitted) {
            content = (
                <div>
                    <h1>Thanks for your participation!</h1>
                    <h4 className={classes.Message}>You got ₪{this.state.budget} left in your budget.</h4>
                </div> 
            )

        }
        return (
            <div>
                {content}   
            </div>
            );
    }
}

export default ItemSelector;