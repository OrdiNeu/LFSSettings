class Main extends React.Component {
  render() {
    console.log("canModifyClient value: " + canModifyClient);
    let componentsToRender;

    if (canModifyClient) {
      componentsToRender = <UserEntryForm />;
    }
    else {
      componentsToRender = null;
    }

    // Return a div containing components
    // return (
    //   <div className="main-components">
    //     <TitleBar />
    //     {componentsToRender}
    //     <AccessControlEntries />
    //   </div>
    // );

    // Or we can return an array of components directly
    return (
      <React.Fragment>
        <TitleBar />
        {componentsToRender}
        <AccessControlEntries />
      </React.Fragment>
    );
  }
}

class TitleBar extends React.Component {
  render() {
    return (
        <h1>Manage Access Control For: { currentNodePath } </h1>
      )
  }
}

class UserEntryForm extends React.Component {
  render() {
    var actionPath = contextPath + currentNodePath + ".ace.html";
    return (
       <fieldset>
          <legend>Add an entry for a user or group</legend>
          <form method="GET" action={ actionPath }>
             <label htmlFor="addpid">Principal Name:</label> 
             <input id="addpid" type="text" name="pid" placeholder="" />
             <input type="submit" placeholder="Add"/>
          </form>
       </fieldset>
    )
  }
}

class AccessControlEntries extends React.Component {
  
  render() {
    var arrayOfEntries = [];
    var actionPath = contextPath + currentNodePath + ".deleteAce.html";

    let nameCount = arrayOfNamesClient.length;
    for (var i = 0; i < nameCount; ++i) {
      arrayOfEntries.push( // Note that key = i is a bad key, need unique row key
        <EntriesList key={i} principalName={arrayOfNamesClient[i]} 
        privilageDisplayName={arrayOfPrivilageDisplayNamesClient[i]} />)
    }

    return (
     <fieldset>
        <legend>Current access control entries</legend>

        <form method="POST" action={ actionPath } >
           <input type="hidden" name=":redirect" placeholder={ contextPath } />
           
           <table width="100%">
              <thead>
                 <tr>
                    <th align="left" width="60%">Principal</th>
                    <th align="center" width="25%">Privileges</th>
                    <th align="center" width="15%">
                      { canModifyClient ? 'Remove' : '' } 
                    </th>
                 </tr>
              </thead>

              <tbody>
              {arrayOfEntries}
              </tbody>

              <tfoot>
                 <tr>
                    <td colSpan="2"></td>
                    <td align="center"><input type="submit" value="Remove Selected" style={{color:'red'}}/></td>
                 </tr>
              </tfoot>
           </table>
        </form>
     </fieldset>
      )
  }
}

class EntriesList extends React.Component {

  render () {
    if (canModifyClient) {
      return (
          <tr>
            <td align="left" width="60%" >
              <a href={contextPath + currentNodePath + ".ace.html?pid=" + this.props.principalName}>
                 {this.props.principalName}
              </a>
            </td>

            <td align="center" width="25%" >
               {this.props.privilageDisplayName}
            </td>

            <td align="center" width="15%">
                <input type="checkbox" name=":applyTo" value={this.props.principalName} />
            </td>
          </tr>
        )
    } else {
      return (
        <tr>
          <td align="left" width="60%" >
            {this.props.principalName}
          </td>

          <td align="center" width="25%" >
             {this.props.privilageDisplayName}
          </td>

          <td align="center" width="15%">
          </td>

        </tr>
      )
    }
  }
}


////////////////////////////////////////////////
ReactDOM.render(
  <Main />,
  document.getElementById('main-container')
);
///////////////////////////////////////////////////