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
    var actionPath = contextPath + currentNodePath + ".deleteAce.html";
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



/////////////////////////////////////////////////////////////////////
// Ignore below
/////////////////////////////////////////////////////////////////////
class SomeBtn extends React.Component {
  render() {
    return (
      <button className="generic-button">
        Hi there yo
      </button>
    );
  }
}


class SomeInputForm extends React.Component {
  render() {
    return (
      <input type="text">
      </input>
    );
  }
}

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const rows = [];
    let lastCategory = null;
    
    this.props.products.forEach((product) => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
}


const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
 
// ReactDOM.render(
//   <FilterableProductTable products={PRODUCTS} />,
//   document.getElementById('intermediaryTableContainer')
// );

// ReactDOM.render(
//   <SomeBtn />,
//   document.getElementById('someBtnTest')
// );

ReactDOM.render(
  <TitleBar />,
  document.getElementById('title-test')
);

ReactDOM.render(
  <UserEntryForm />,
  document.getElementById('user-entry-form')
);

ReactDOM.render(
  <AccessControlEntries />,
  document.getElementById('access-control-entries')
);

/*
ReactDom.render(
  <SomeInputForm />,
  document.getElementById('addpid')
); */