/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555,
    bookingTime: new Date(),
  },
  {
    id: 2, name: 'Rose', phone: 88884444,
    bookingTime: new Date(),
  },
];

const total_seats = 10; //Setting max seats to 10.

function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  let { id, name, phone, bookingTime } = props.traveller;  
  const bookingTimeString = bookingTime instanceof Date ? bookingTime.toLocaleString() : new Date(bookingTime).toLocaleString();

  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{id}</td>
      <td>{name}</td>
      <td>{phone}</td>
      <td>{bookingTimeString}</td>
    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/

  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {props.travellersprop.map((traveller) => (
        <TravellerRow key={traveller.id} traveller={traveller} />
        ))}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const form_add = document.forms.addTraveller;

    if (this.props.travellersprop.length < total_seats ) {
    this.props.addfunction(form_add.travellername.value,form_add.travellernumber.value);
    form_add.reset();
    alert("Entry Added!")} else {
      alert("Overflow!")
    }
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <label for="addName">Enter Name: <input type="text" name="travellername" placeholder="Name" required /></label>
        <label for="addPhoneNumber">Enter Phone Number:<input type="number" name="travellernumber" placeholder="Name" required /></label>
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = document.forms.deleteTraveller;

    this.props.deletefunction(form.travellername.value);
    form.reset();

  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
	      <input type="text" name="travellername" placeholder="Name" />
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
	constructor() {
	super();
	}

  renderButtons = (seats, color, prefix) => {
    // Create an array of buttons based on the number specified
    return Array.from({ length: seats }, (v, i) => (
      <button key={`${prefix}-${i}`} style={{ backgroundColor: color, width:'50px',height:'50px'}}>
        
      </button>
    ));
  };

	render(){
    const { seats_taken, remaining_seats } = this.props;
    
	return (
	<div>
		{/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
    <nav className ="navbar">
      <ul>
          <li><a href="#" onClick={() => this.props.select(2)}>Add</a></li>
          <li><a href="#" onClick={() => this.props.select(3)}>Delete</a></li>
          <li><a href="#" onClick={() => this.props.select(1)}>Display</a></li>
      </ul>
    </nav>

    <h2>Remaining Seats: {remaining_seats}</h2>
        <div className="seat-chart">
          {this.renderButtons(seats_taken, 'red', 'A')}
          {this.renderButtons(remaining_seats, 'green', 'B')}
        </div>

	</div>);
	}
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setSelector = this.setSelector.bind(this);
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({selector: value},()=>console.log(this.state.selector));
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger_name , pasenger_number) {
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
 
      const newTraveller = {
        id: this.state.travellers.length + 1,
        name: passenger_name,
        phone: pasenger_number,
        bookingTime: new Date(), 
      };

      var new_list = this.state.travellers;
      new_list.push(newTraveller);
      console.log(new_list)
      this.setState({travellers: new_list},()=>console.log('hello',this.state.travellers));
  }

  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/

    var new_list = []; //new list after deletion
    this.state.travellers.forEach(element => {
      if (element.name != passenger) { 
        new_list.push(element);
      }
    });

    this.setState({ travellers: new_list }, () => {
      console.log("Updated travellers:", this.state.travellers);
  })}

  render() {

    let seats_taken = this.state.travellers.length;
    let remaining_seats = total_seats - seats_taken;

    return (
      <div>
        <h1>Ticket To Ride</h1>
	<div>
	    {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
      <Homepage select={this.setSelector} seats_taken={seats_taken} remaining_seats={remaining_seats}/>
	</div>
	<div>
		{/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
		{/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
		{/*Q3. Code to call component that Displays Travellers.*/}
    <br></br>
    {this.state.selector === 1 && <Display travellersprop={this.state.travellers}/>}

		{/*Q4. Code to call the component that adds a traveller.*/}
    {this.state.selector === 2 && <Add addfunction={this.bookTraveller} travellersprop={this.state.travellers}/>}

		{/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
    {this.state.selector === 3 && <Delete deletefunction={this.deleteTraveller} travellersprop={this.state.travellers}/>}
    
    {/* <Display travellersprop={this.state.travellers}/>
    <Add addfunction={this.bookTraveller} travellersprop={this.state.travellers}/>
    <Delete deletefunction={this.deleteTraveller} travellersprop={this.state.travellers}/> */}


	</div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
