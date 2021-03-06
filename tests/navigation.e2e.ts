import LoginPage from './pageobjects/login.po';
import NavbarPage from './pageobjects/navbar.po';
import { testEnvironment } from './config/config';
import StudentPage from './pageobjects/students.po';
import UsersPage from './pageobjects/users.po';
import LessonsPage from './pageobjects/lessons.po';
import ClassesPage from './pageobjects/classes.po';
import ClassDetailsPage from './pageobjects/class-details.po';

const loginPage = new LoginPage();
const navbar = new NavbarPage();
const studentPage = new StudentPage();
const lessonsPage = new LessonsPage();
const classDetailsPage = new ClassDetailsPage();
const usersPage = new UsersPage();
const classesPage = new ClassesPage();

fixture(`Navigation tests`).page(testEnvironment.feUrl);

const waitForDefaultPage = async () => {
  await studentPage._id().exists;
};

test('principle navigates to students (default) screen after login', async (t) => {
  await loginPage.loginAsPrinciple();
  await t.expect(studentPage._id().exists).ok();
});

test('principle can navigate to all pages from navbar', async (t) => {
  await loginPage.loginAsPrinciple();
  await navbar.navigateToStudentsPage();
  await t.expect(studentPage._id().exists).ok();
  await navbar.navigateToUsersPage();
  await t.expect(usersPage._id().exists).ok();
  await navbar.navigateToLessonsPage();
  await t.expect(lessonsPage._id().exists).ok();
  await navbar.navigateToClassesPage();
  await t.expect(classesPage._id().exists).ok();
});

test('principle can navigate to all pages by url', async (t) => {
  await loginPage.loginAsPrinciple();
  await t
    .navigateTo(StudentPage.url)
    .expect(studentPage._id().exists)
    .ok()
    .navigateTo(UsersPage.url)
    .expect(usersPage._id().exists)
    .ok()
    .navigateTo(LessonsPage.url)
    .expect(lessonsPage._id().exists)
    .ok()
    .navigateTo(ClassesPage.url)
    .expect(classesPage._id().exists)
    .ok();
});

test('teacher navigates to students (default) screen after login', async (t) => {
  await loginPage.loginAsTeacher();
  await t.expect(studentPage._id().exists).ok();
});

test('teacher can navigate to authorized pages only, from navbar', async (t) => {
  await loginPage.loginAsTeacher();
  // allowed
  await navbar.navigateToStudentsPage();
  await t.expect(studentPage._id().exists).ok();
  await navbar.navigateToClassSchedulePage();
  await t.expect(classDetailsPage._id().exists).ok();

  // not allowed
  await t.expect(navbar.menuDropDownUsers().exists).notOk();
  await t.expect(navbar.menuDropDownClasses().exists).notOk();
});

test('teacher can navigate to authorized pages only, by url (deep linking)', async (t) => {
  await loginPage.loginAsTeacher();
  // allowed
  await t
    .navigateTo(StudentPage.url)
    .expect(studentPage._id().exists)
    .ok()
    //navigate to a specific teacher's class
    .navigateTo(`${ClassesPage.url}/5ba10adc9c9b4e6c731d62b7`)
    .expect(classDetailsPage._id().exists)
    .ok()

    // not allowed
    .navigateTo(ClassesPage.url)
    .expect(classesPage._id().exists)
    .notOk()
    // we should be thrown to login page for not allowed pages.
    // but the url includes 'return url' which won't let the teacher login.
    // so we need to navigate to login page again.
    .navigateTo(loginPage.url);
  await loginPage.loginAsTeacher();
  await waitForDefaultPage();
  await t
    .navigateTo(LessonsPage.url)
    .expect(lessonsPage._id().exists)
    .notOk()
    .navigateTo(loginPage.url);
  await loginPage.loginAsTeacher();
  await waitForDefaultPage();
  await t
    .navigateTo(UsersPage.url)
    .expect(usersPage._id().exists)
    .notOk();
});
