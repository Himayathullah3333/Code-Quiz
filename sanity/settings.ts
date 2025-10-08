export default {
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    {
      name: 'defaultCategory',
      title: 'Default Category',
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'Information Technology', value: 'information-technology' },
          { title: 'AI & DS', value: 'aids' },
          { title: 'CSE', value: 'cse' },
          { title: 'Sales', value: 'sales' }
        ],
        layout: 'radio'
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'defaultCount',
      title: 'Default Question Count',
      type: 'number',
      description: 'How many questions to show when no count is specified',
      initialValue: 30,
      validation: (Rule: any) => Rule.min(2).max(30).required()
    }
  ]
}