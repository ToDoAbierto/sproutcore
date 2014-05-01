// ==========================================================================
// Project: SproutCore Task Framework
// Copyright: @2013 Michael Krotscheck and contributors
// License: Licensed under MIT license (see license.js)
// ==========================================================================

/**
  The SproutCore Task Framework was built to simplify and encapsulate common
  business logic into easily testable, reusable components. Rather than build a
  large amount of custom logic in each controller, some of which may be
  reusable, you instead construct a series of small, atomic, configurable
  tasks.

  Because of the generic set of events that are fired by the Task Framework,
  you can chain multiple different tasks to run either sequentially or in
  parallel, and again chain those Task Groups to run sequentially or in
  parallel as well. Tasks may even be taught how to rewind themselves, so that
  your application can easily and quickly recover from unexpected error
  conditions.

  Let us take a login flow as an example. When a user logs in, the following
  steps have to occur:

  <ul>
  <li>A user's record must be loaded.</li>
  <li>A user's preferences must be loaded.</li>
  <li>A user's last logged in status must be updated.</li>
  </ul>

  Using the task framework, this might look as follows:

      var myTask = SC.Task.SequentialTaskGroup.create({

         tasks: ['loadUserRecord', 'loadUserContent'],

         loadUserRecord : SC.Task.plugin("MyApp.LoadUserTask", { userId: 'foo' }),

         loadUserContent : SC.ParallelTaskGroup.create({
           tasks: ['loadUserPreferences', 'updateUserLoginDate'],

           loadUserPreferences : SC.Task.plugin("MyApp.LoadUserPrefencesTask", { userId: 'foo' }),

           updateUserLoginDate : SC.Task.plugin("MyApp.UpdateUserLoginTask", { userId: 'foo' }),
         })
      });

      SC.TaskEvent.add(myTask, "complete", myObj, "_onTaskComplete");
      SC.TaskEvent.add(myTask, "error", myObj, "_onTaskError");

      myTask.start();

  Special Thanks to Jens Halm, whose work on the Parsley Task Framework was
  heavily referenced.
 */
