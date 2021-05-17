import { createSchema, list } from '@keystone-next/keystone/schema';
import { checkbox, password, relationship, select, text, timestamp } from '@keystone-next/fields';

export const lists = createSchema({
  // Things to be done
  Task: list({
    access: { delete: ({ session }) => session?.data?.isAdmin },
    fields: {
      label: text({ isRequired: true }),
      priority: select({
        dataType: 'enum',
        options: [
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
        ],
      }),
      isComplete: checkbox(),
      assignedTo: relationship({ ref: 'Person.tasks', many: false }),
      finishBy: timestamp(),
    },
  }),

  // Can be assigned tasks
  // People are also the operators of the system; can sign in to the Admin UI and manage data
  Person: list({
    access: { delete: ({ session }) => session?.data?.isAdmin },
    ui: {
      hideDelete: ({ session }) => !session?.data?.isAdmin,
      listView: { initialColumns: ['name', 'email', 'isAdmin'] },
    },
    fields: {
      name: text({ isRequired: true }),
      email: text({ isRequired: true, isUnique: true }),
      password: password({
        access: {
          update: ({ session, item }) =>
            session && (session.data.isAdmin || session.itemId === item.id),
        },
        ui: {
          itemView: {
            fieldMode: ({ session, item }) =>
              session && (session.data.isAdmin || session.itemId === item.id) ? 'edit' : 'hidden',
          },
          listView: {
            fieldMode: ({ session }) => (session?.item?.isAdmin ? 'read' : 'hidden'),
          },
        },
      }),
      isAdmin: checkbox({
        access: {
          create: ({ session }) => session?.data.isAdmin,
          update: ({ session }) => session?.data.isAdmin,
        },
        ui: {
          createView: {
            fieldMode: ({ session }) => (session?.data.isAdmin ? 'edit' : 'hidden'),
          },
          itemView: {
            fieldMode: ({ session }) => (session?.data.isAdmin ? 'edit' : 'read'),
          },
        },
      }),
      tasks: relationship({ ref: 'Task.assignedTo', many: true }),
    },
  }),
});
