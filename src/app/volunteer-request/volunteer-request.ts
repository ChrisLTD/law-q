import { Allow, Entity, EntityBase, Fields, Validators } from 'remult'
import { NameField } from '../help-requests/HelpRequest'
import { EmailField } from '../common/fields/EmailField'
import { PhoneField } from '../common/fields/PhoneField'
import { ValueListField } from '../common/fields/ValueListField'
import { recordChanges } from '../common/change-log/change-log'

@Entity('VolunteerRequests', {
  allowApiCrud: Allow.authenticated,
  allowApiInsert: true,
  saving: async (self, e) => {
    await recordChanges(self, e)
  },
})
export class VolunteerRequest extends EntityBase {
  @Fields.autoIncrement()
  id = 0
  @NameField()
  name = ''
  @Fields.string({
    caption: 'תעודת זהות',
    validate: [
      Validators.required,
      (_, f) => {
        //verify that it is only digits
        if (!f.value.match(/^\d+$/)) throw Error('נא להזין מספרים בלבד')
      },
    ],
  })
  idNumber = ''
  @Fields.string({
    caption: 'מספר רישיון',
    validate: [
      Validators.required,
      (_, f) => {
        if (!f.value.match(/^\d+$/)) throw Error('נא להזין מספרים בלבד')
      },
    ],
  })
  licenseNumber = ''
  @EmailField()
  email = ''
  @PhoneField()
  phone = ''
  @Fields.string({ caption: 'עיר', validate: [Validators.required] })
  city = ''
  @ValueListField(['כן', 'לא'], {
    caption: 'האם יש לך ביטוח אחריות מקצועית?',
    validate: [Validators.required],
  })
  doYouHaveInsurance = ''
  @Fields.string({ caption: 'מעסיק', validate: [Validators.required] })
  employer = ''
  @Fields.json<VolunteerRequest, string[]>({
    caption: 'תחומי התמחות',
    validate: (_, f) => {
      if ((f.value?.length || 0) == 0)
        throw Error('חובה לבחור לפחות תחום התמחות אחד')
    },
  })
  legalExpertise: string[] = []
  @Fields.string({
    caption: 'מידע רלוונטי אחר',
    customInput: (e) => e.textarea(),
  })
  notes = ''
}