import React from 'react';
 import styles from '../modules/dashboard.css';

export default function Dashboard(props) {
  return (
    // test
    <div className={styles.dashboardContainer}>
      {/* edit profile area */}
      <div className={styles.dashboardProfileForm} >
        <h2>edit profile</h2>
        <form>
          <div className={styles.dashboardNameInput}>
            <h2>name</h2>
            <input type="text" className="name" placeholder="name" />
          </div>

          <div className={styles.dashboardEmailInput}>
            <h2>email</h2>
            <input type="email" className="email" placeholder="email" />
          </div>

          <div className={styles.dashboardPasswordInput}>
            <h2>password</h2>
            <input type="text" className="name" placeholder="password" />
          </div>
          <button type="submit" className={styles.dashboardFormBtn}>save changes</button>
        </form>
      </div>

      {/* tables */}
      <div className={styles.dashboardTables}>
        <h2>your tables</h2>
        <div className={styles.dashboardTablesContainer}>
          {props.boards.map(board =>
            <ul>
                <li>
                  <div className={styles.newTable}>
                    {board}
                  </div>
                </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
