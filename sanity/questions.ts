export default {
  name: 'questions',
  title: "Questions",
  type: 'document',
  fields: [
    {
      name: 'category',
      title: 'Category',
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
      name: 'question',
      title: "Question",
      type: "string"
    },
    {
      name: 'answers',
      title: "Answers",
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: "correctAnswer",
      title: "Correct Answer",
      type: "string"
    }
  ]
}