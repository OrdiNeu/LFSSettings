const {
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  DeleteIcon,
  FilterListIcon,

  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
  Grid,
  Icon,
  Button,
  lighten,

  MuiThemeProvider,
  createMuiTheme,
  CssBaseline,

  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,

  
} = window['material-ui'];

// const {
//   AccountCircle,
// } = window ['material-ui@icons'];

const PropTypes = window.PropTypes;

const ClassNames = window.ClassNames;

const Select = window.Select;

// const Autosuggest = window['react-autosuggest'];
const Autosuggest = window.Autosuggest;

const Match = window.AutosuggestHighlightMatch;

const Parse = window.AutosuggestHighlightParse;

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

function createDataFromUsers() {
  var arrayOfData = [];
  for (var i = 0; i < arrayOfNamesClient.length; ++i) {
    arrayOfData.push(createData(arrayOfNamesClient[i], arrayOfPrivilageDisplayNamesClient[i], 0, 0, 0));
  }

  return arrayOfData;
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Username' },
  { id: 'calories', numeric: false, disablePadding: false, label: 'Privilage Level' },
  { id: 'fat', numeric: false, disablePadding: false, label: 'Last Modified Date' },
  // { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  // { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          // backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          backgroundColor: "white",
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

class EnhancedTableToolbar extends React.Component {
  constructor (props) {
    super(props);

    this.state = ({
      warningIsOpen: false
    })
  }

  handleClose = () => {
    this.setState({
      warningIsOpen: false,
    });
  };

  handleDelete = () => {
    this.setState({
      warningIsOpen: true,
    });
  };

  handleSubmit = () => {
    document.getElementById("delete-users-form-react").submit();
  };
  
  render () {
    const { numSelected, classes } = this.props;

    return (


      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>

      <Dialog open={this.state.warningIsOpen} onClose={this.handleClose}>
        <DialogTitle>Are you sure you wish to remove?</DialogTitle>
        <DialogContent>
          <DialogContentText>Their permissions will be deleted for good.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" type="submit" onClick={this.handleSubmit}>
            OK
          </Button>
          <Button color="primary" onClick={this.handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected} users selected
            </Typography>
          ) : (
            <Typography variant="h6" id="tableTitle">
              User List
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete" onClick={this.handleDelete}>
                <Icon className={classes.icon}>delete</Icon>
              </IconButton>
            </Tooltip>
          ) : (
            // <Tooltip title="Filter list">
            //   <IconButton aria-label="Filter list">
            //     <Icon className={classes.icon}>filter_list</Icon>
            //   </IconButton>
            // </Tooltip>
            <Tooltip title="Select users to delete">
              <IconButton aria-label="Delete" disabled={true} >
                <Icon className={classes.icon} >delete</Icon>
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    );
  }
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

const EnhancedTableToolbarTwo = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    // data: [
    //   createData('Cupcake', 305, 3.7, 67, 4.3),
    //   createData('Donut', 452, 25.0, 51, 4.9),
    //   createData('Eclair', 262, 16.0, 24, 6.0),
    //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //   createData('Gingerbread', 356, 16.0, 49, 3.9),
    //   createData('Honeycomb', 408, 3.2, 87, 6.5),
    //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //   createData('Jelly Bean', 375, 0.0, 94, 0.0),
    //   createData('KitKat', 518, 26.0, 65, 7.0),
    //   createData('Lollipop', 392, 0.2, 98, 0.0),
    //   createData('Marshmallow', 318, 0, 81, 2.0),
    //   createData('Nougat', 360, 19.0, 9, 37.0),
    //   createData('Oreo', 437, 18.0, 63, 4.0),
    // ],
    data: createDataFromUsers(),
    page: 0,
    rowsPerPage: 5,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    var actionPath = contextPath + currentNodePath + ".deleteAce.html";
    
    return (
      <Paper className={classes.root}>
        <form method="POST" action={ actionPath } id="delete-users-form-react" >
        <input type="hidden" name=":redirect" placeholder={ contextPath } />
        { <EnhancedTableToolbarTwo numSelected={selected.length} /> }
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} name=":applyTo"
                      value={n.name} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none" >
                        <a href={contextPath + currentNodePath + ".ace.html?pid=" + n.name} >{n.name}
                        </a>
                      </TableCell>
                      <TableCell align="left">{n.calories}</TableCell>
                      <TableCell align="left">{n.fat}</TableCell>

                    </TableRow>
                  );
                })}
              {/*emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )*/}
            </TableBody>
          </Table>
          
        </div>
        </form>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const TableTest = withStyles(styles)(EnhancedTable);
// export default withStyles(styles)(EnhancedTable);









// Suggestion generator
const suggestions = arrayOfNamesClient.map(function(aName) {
  return {label: aName}
});

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = Match(suggestion.label, query);
  const parts = Parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          ),
        )}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}



const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
  // Theme for suggestions
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class InputWithIcon extends React.Component {
  constructor (props) {
    super(props);

    this.state = { 
      userEntered: "",
      suggestions: [],
    };
  }

  handleSubmit = (event) => {
    console.log("Event fired");
  }

  setUsernameEntered = (event) => {
    this.setState ({
      userEntered: event.target.value
    });
    // console.log("Username was entered: " + this.state.userEntered);
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render () {
    const { classes } = this.props;

    var actionPath = contextPath + currentNodePath + ".ace.html";

    return (
      <div>
      {/*
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="input-with-icon-adornment">With a start adornment</InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
        <TextField
          className={classes.margin}
          id="input-with-icon-textfield"
          label="TextField"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
      */}
        

        <div className={classes.margin}>
        <Typography variant="h5">
          Add an entry for a user or group
        </Typography>
      {/* Two ways of doing this, handleSubmit function to send ajax to server using external library, or directly here using a form for simplicity */}
        <form onSubmit={this.handleSubmit} method="GET" action={ actionPath }>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Icon className={classes.icon}>account_circle</Icon>
            </Grid>
              <Grid item>
                <TextField id="input-with-icon-grid" label="Username" onChange={this.setUsernameEntered}/> 
                {/* <Autosuggest
                  {...autosuggestProps}
                  inputProps={{
                    classes,
                    placeholder: 'Search a user',
                    value: this.state.single,
                    onChange: this.handleChange('single'),
                  }}
                  theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                  }}
                  renderSuggestionsContainer={options => (
                    <Paper {...options.containerProps} square>
                      {options.children}
                    </Paper>
                  )}
                /> */}
              </Grid>
              <Grid item>
                <Button variant="raised" color="secondary" type="submit">
                  <Icon className={classes.icon}>group_add</Icon>
                  Add User
                </Button>
              </Grid>
            </Grid>
            <input type="hidden" value={this.state.userEntered} name="pid"/>
          </form>
        </div>
      </div>
    );
  }
}

InputWithIcon.propTypes = {
  classes: PropTypes.object.isRequired,
};

const InputTest = withStyles(styles2)(InputWithIcon);
// export default withStyles(styles)(InputWithIcon);

class Main extends React.Component {
  render () {
    return (
      <div>
        <InputTest />
        <TableTest />
      </div>
    );
  }
}

ReactDOM.render(
  <Main />,
  // withStyles(styles, EnhancedTable),
  document.getElementById('table-test')
);
