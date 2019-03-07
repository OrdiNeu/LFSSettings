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
			arrayOfPermissions.push(<FormRow key={i} grantedBool={grantedPermissionClient[i]} deniedBool={deniedPermissionClient[i]} permissionName={permissionNamesClient[i]} />);
			
			console.log("Passing granted, denied, permission: " + grantedPermissionClient[i] + deniedPermissionClient[i] + permissionNamesClient[i]);
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
	render () {
		var isLeftChecked = (this.props.grantedBool || this.props.deniedBool) ? "" : "checked";
		var isCenterChecked = this.props.grantedBool ? "checked" : "";
		var isRightChecked = this.props.deniedBool ? "checked" : "";
		return (
			<tr>
               <td align="left" width="55%">{this.props.permissionName}</td>
               <td align="center" width="15%">
               	<input type="radio" name={"privilege@" + this.props.permissionName} value="none" checked={isLeftChecked} /></td>
               <td align="center" width="15%"><input type="radio" name={"privilege@" + this.props.permissionName} value="granted" checked={isCenterChecked} /></td>
               <td align="center" width="15%"><input type="radio" name={"privilege@" + this.props.permissionName} value="denied" checked={isRightChecked} /></td>
            </tr>     
		);
	}
}

class Main extends React.Component {
	render () {
		return (
			<React.Fragment>
			<TitleBar />
			<Form />
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