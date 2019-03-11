class TitleBar extends React.Component {
	render () {
		return (
			<h1> Modify Access Control Entry For: { principalIdClient } </h1>
		);
	}
}

class Form extends React.Component {
	render () {
		var arrayOfPermissions = [];
		let permissionsCount = permissionNamesClient.length;
		for (var i = 0; i < permissionsCount; ++i) {
			// Add a row for each property
			arrayOfPermissions.push(<FormRow key={permissionNamesClient[i]} grantedBool={grantedPermissionClient[i]} deniedBool={deniedPermissionClient[i]} permissionName={permissionNamesClient[i]} />);
			
			// console.log("Passing granted, denied, permission: " + grantedPermissionClient[i] + deniedPermissionClient[i] + permissionNamesClient[i]);
		}

		return (
		<form method="POST" action={contextPath + currentNodePath + ".modifyAce.html"} >
         <input type="hidden" name=":redirect" value={contextPath + currentNodePath + ".acl.html"} />
         <input type="hidden" name="principalId" value={principalIdClient} />
      
         <table width="100%" id="settingsTable">
            <thead>
               <tr>
                  <th align="left" width="55%">Privilege</th>
                  <th align="center" width="15%">Ignored</th>
                  <th align="center" width="15%">Granted</th>
                  <th align="center" width="15%">Denied</th>
               </tr>
            </thead>
            <tbody>

            {arrayOfPermissions}

            </tbody>
            <tfoot>
               <tr>
                  <td colSpan="3"></td>
                  <td align="center" width="15%">
                     <button accessKey="a" id="applyButton" className="form-button myBtnClass" type="submit">Apply</button>
                  </td>
               </tr>
            </tfoot>
         </table>
      	</form>

		);
	}
}

class FormRow extends React.Component {
	constructor (props) {
		super (props);

		var initialPosition = 'none';

		if (!(props.grantedBool || props.deniedBool)) {
			initialPosition='none';
		}
		if (props.grantedBool) {
			initialPosition='granted';
		}
		if (props.deniedBool) {
			initialPosition='denied';
		}

		this.state = { // State isn't updated immediately?
			position: initialPosition // Granted, Denied, or Ignored
		};

		// console.log("Debug position: " + initialPosition);

		//this.handleChange = this.handleChange.bind(this);
	}

	handleChange (e) {
		this.setState({
			position: e.currentTarget.value
		});

	}

	render () {
		return (
			<tr>
               <td align="left" width="55%">{this.props.permissionName}</td>
               <td align="center" width="15%">
               	<input type="radio" name={"privilege@" + this.props.permissionName} value="none" checked={this.state.position === 'none'} onChange={event => this.handleChange(event)} /></td>
               <td align="center" width="15%"><input type="radio" name={"privilege@" + this.props.permissionName} value="granted" checked={this.state.position === 'granted'} onChange={event => this.handleChange(event)} /></td>
               <td align="center" width="15%"><input type="radio" name={"privilege@" + this.props.permissionName} value="denied" checked={this.state.position === 'denied'} onChange={event => this.handleChange(event)} /></td>
            </tr>     
		);
	}
}

class DropdownForm extends React.Component {
	constructor () {
		super();

		this.state = {
			permission: 'none'
		};
	}

	handleChange(e) {
		this.setState({
			permission: e.currentTarget.value
		});
		console.log("change state of dropdown: ");
	}

	render () {
		var createItem = function(anOption) {
			return <option key={anOption} value={anOption} onChange={event => this.handleChange(event)} >{anOption}</option>
		};

		return (
			<div> Second View here:
				<form method="POST" action={contextPath + currentNodePath + ".modifyAce.html"} >
         		<input type="hidden" name=":redirect" value={contextPath + currentNodePath + ".acl.html"} />
         		<input type="hidden" name="principalId" value={principalIdClient} />

				<select> {permissionNamesClient.map(createItem)} </select>

		         <table width="100%" id="settingsTable">
		            <thead>
		               <tr>
		                  <th align="left" width="55%">Privilege</th>
		                  <th align="center" width="15%">Ignored</th>
		                  <th align="center" width="15%">Granted</th>
		                  <th align="center" width="15%">Denied</th>
		               </tr>
		            </thead>
		            <tbody>



		            </tbody>
		            <tfoot>
		               <tr>
		                  <td colSpan="3"></td>
		                  <td align="center" width="15%">
		                     <button accessKey="a" id="applyButton" className="form-button myBtnClass" type="submit">Apply</button>
		                  </td>
		               </tr>
		            </tfoot>
		         </table>

			</form>
			</div>
		);
	}
}

class Main extends React.Component {
	render () {
		return (
			<React.Fragment>
			<TitleBar />
			<Form />
			{ <DropdownForm /> }
			</React.Fragment>
		);
	}
}

////////////////////////////////////////////////
ReactDOM.render(
  <Main />,
  document.getElementById('permission-table-container')
);
///////////////////////////////////////////////////