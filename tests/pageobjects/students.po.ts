import { Selector, t } from 'testcafe';

export default class StudentsPage {
  static url = '/student';
  _id: Selector;
  newStudentButton: Selector;
  personalDetailsTab: Selector;
  scheduleTab: Selector;
  remindersTab: Selector;
  saveButton: Selector;
  firstName: Selector;
  lastName: Selector;
  username: Selector;
  classId: Selector;
  classIdOption: Selector;
  password: Selector;
  firstNameErr: Selector;
  lastNameErr: Selector;
  usernameErr: Selector;
  usernameFormatErr: Selector;
  classIdErr: Selector;
  passwordErr: Selector;
  studentNameCell: Selector;
  deleteStudentButton: Selector;
  confirmDeleteButton: Selector;
  scheduleCell: Selector;
  editCellDialogue: Selector;
  editCellLesson: Selector;
  editCellLocation: Selector;
  lessonOption: Selector;
  locationOption: Selector;
  editCellUpdateButton: Selector;
  editCellCloseButton: Selector;

  constructor() {
    this._id = Selector('[data-test-id$="students-page"]');
    this.newStudentButton = Selector('[data-test-id$="new-student-button"]');
    this.personalDetailsTab = Selector('[data-test-id$="personal-info-tab"]');
    this.scheduleTab = Selector('[data-test-id$="schedule-tab"]');
    this.remindersTab = Selector('[data-test-id$="reminders-tab"]');
    this.saveButton = Selector('[data-test-id$="save-button"]');
    this.username = Selector('[name$="username"]');
    this.firstName = Selector('[name$="firstname"]');
    this.lastName = Selector('[name$="lastname"]');
    this.classId = Selector('[name$="class_id"]');
    this.classIdOption = Selector('[class="mat-option-text"]');
    this.password = Selector('[name$="password"]');
    this.usernameErr = Selector('[data-test-id$="username-err"]');
    this.usernameFormatErr = Selector('[data-test-id$="username-format-err"]');
    this.firstNameErr = Selector('[data-test-id$="firstname-err"]');
    this.lastNameErr = Selector('[data-test-id$="lastname-err"]');
    this.classIdErr = Selector('[data-test-id$="class-id-err"]');
    this.passwordErr = Selector('[data-test-id$="password-err"]');
    this.studentNameCell = Selector('.username');
    this.confirmDeleteButton = Selector('[id$="confirm-delete-user"');
    this.scheduleCell = Selector('[role$="gridcell"]').nth(10);
    this.editCellDialogue = Selector('[data-test-id$="edit-cell-dialogue"]');
    this.editCellLesson = Selector('[data-test-id$="lessons-dropdown"]');
    this.editCellLocation = Selector('[data-test-id$="locations-dropdown"]');
    this.lessonOption = Selector('.lessons-option');
    this.locationOption = Selector('.locations-option');
    this.editCellUpdateButton = Selector('[data-test-id$="update-edit-lesson-dialogue"]');
    this.editCellCloseButton = Selector('[data-test-id$="close-edit-lesson-dialogue"]');
  }

  async createTestUser(userName: string, className: string) {
    this.studentNameCell = this.studentNameCell.withExactText(userName);
    this.deleteStudentButton = Selector('[data-test-id$="delete-user-button-' + userName + '"]');
    this.classIdOption = this.classIdOption.withExactText(className);

    //If the user exists - delete it.
    if (await this.studentNameCell.exists) {
      await t.click(this.deleteStudentButton).click(this.confirmDeleteButton);
    }
    //If the user still exists - fail the test
    await t.expect(this.studentNameCell.exists).notOk();
    //Create a new scheduleTestUser
    await t.click(this.newStudentButton);
    await this.firstName();
    await t.typeText(this.username, userName);
    await t.typeText(this.password, userName);
    await t.typeText(this.firstName, userName);
    await t.typeText(this.lastName, userName);
    await t.click(this.classId);
    await t.click(this.classIdOption);
    await t.click(this.saveButton);

    //user should now exist
    await t.expect(this.studentNameCell.exists).ok();
  }

  async createNewScheduleTestUser() {
    await this.createTestUser('scheduleTestUser', 'טיטאן');
  }

  async navigateToScheduleTab() {
    await t.click(this.studentNameCell);
    await t.click(this.scheduleTab);
  }

  async createNewScheduleCell() {
    await t.expect(this.scheduleCell.textContent).contains('add');
    await t.click(this.scheduleCell);
    await t.click(this.editCellLesson);
    await t.click(this.lessonOption);
    await t.click(this.editCellLocation);
    await t.click(this.locationOption);
  }
}
