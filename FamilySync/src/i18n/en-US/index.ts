export default {
  homePage: {
    welcomeMessage: 'Welcome to the homepage!',
    description: 'This is a sample text for the homepage.'
  },
  calendarPage: {
    title: "Calendar",
    viewCalendar: "View",
    editCalendar: "Edit",
    enterDate: "Enter Date",
    enterDescription: "Enter Description",
    scheduledEvents: "Scheduled Events",
    save: "Save",
  },
  shoppingListPage: {
    title: "Shopping",
    whatDoYouWantToBuy: "What do you want to buy?",
    nameIsRequired: "Name on shopping list item is required",
    quantity: "Quantity",
    quantityMustBePositive: "Quantity must be a positive number greater than 0",
    category: "Category",
    addItem: "Add Item",
    shoppingList: "Shopping List",
  },
  todoListPage: {
    title: "Todo List",
    addTodoListItem: "Add task to the todo list",
    describeYourTask: "Describe your task",
    taskDescriptionIsRequired: "Task description is required",
    category: "Category",
    addTask: "Add Task",
    todoList: "Todo List",
  },
  settingsPage: {
    title: 'Settings',
    login: 'Login with Microsoft',
    logout: 'Logout',
    welcome: 'Welcome',
    selectLanguage: 'Select Language',
    pleaseLogin: 'Please, log in to start planning and organizing with FamilySync.',
    roles: {
      title: 'User Roles',
      grantedRoles: 'Granted user roles',
      description: 'Role descriptions',
      CalendarUser: {
        description: 'The user can view the calendar and add events.',
      },
      ShoppingListUser: {
        description: 'The user can view and manage the shopping list.',
      },
      TodoListUser: {
        description: 'The user can view the todo list and add tasks.',
      },
      FamilySyncUser: {
        description: 'The user has access the FamilySync app.',
      },
    },
  },
  auth: {
    dataIsProtected: 'Data is protected by Microsoft authentication.',
    pleaseLogin: 'Please login to access the app.',
    goToLogin: 'Go to login',
  },
  hello: 'Hello',
  youHaveTheFollowingRoles: 'You have been granted the following user roles',
  userDoesNotHaveAccessToData: 'Sorry! Unfortunately, you do not have access to the relevant data on this page.',
  total: 'Total',
  remaining: 'Remaining',
  completed: 'Completed',
  appTitle: 'FamilySync',
};
