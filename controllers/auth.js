// Student Model
const Student = require('../models/Student')
const {
  CREATED,
  INTERNAL_ERROR,
  OK,
  NOT_FOUND,
  CONFLICT
} = require('./STATUS_CODES')

// Logins and returns student data
const login = (req, res) => {
  const { username, password } = req.body
  Student.find({ username, password }, (err, data) => {
    if (err) res.status(INTERNAL_ERROR).json({ message: 'Error Login' })
    else if (data && data.length > 0) res.status(OK).json(data)
    else
      res
        .status(NOT_FOUND)
        .json({ message: 'Error in username and/or password' })
  })
}

// Logins and returns student data
const register = (req, res) => {
  // TEMP
  const student_data = [
    { contentId: 'tz3t9J3jP_w' },
    { contentId: 'MJUWA_OryX4' },
    { contentId: '7FggvuXJuVE' },
    { contentId: 'vr2vLD6oL1g' },
    { contentId: 'j-3Rtdbc7vk' },
    { contentId: 'qPDoyc0Lcy8' },
    { contentId: 'sTiMMpeb0HI' },
    { contentId: '85RoeYbyHtQ' },
    { contentId: '1I1j5fcz2UQ' },
    { contentId: 'V904IK0WgnU' },
    { contentId: 'hy242WWXdAg' },
    { contentId: 'bnADuZDtbQY' },
    { contentId: 'w6fh15jVYmQ' },
    { contentId: '0rKczCKz-Es' },
    { contentId: 'Mv4_YYgxfaE' },
    { contentId: 'IGH7nG5L5kk' },
    { contentId: 'y0b8150Ub5A' },
    { contentId: '9EFT81KVSs0' },
    { contentId: 'IwsgnlzvvQY' },
    { contentId: 'BQkwcq1OfDw' },
    { contentId: 'NSmfpcE7bmQ' },
    { contentId: '2uB6ungUSNo' },
    { contentId: 'wD4XnTG-DGA' },
    { contentId: 'Fma1DUuKc5Y' },
    { contentId: 'Ghx_EDhONio' },
    { contentId: 'tjsLdQXZXz4' },
    { contentId: 'ztWL1Rn71tg' },
    { contentId: 'egjHh7Q5MGk' },
    { contentId: 'W6o0ugd5gBE' },
    { contentId: 'qA0iz1D6aX0' },
    { contentId: 'r3x5gMzVOtA' },
    { contentId: 'JxklEkMZAaY' },
    { contentId: 'GzT9Rk2IVqo' },
    { contentId: 'M_JMRsL7D1M' },
    { contentId: 'loB6LxqW7Mo' },
    { contentId: 'DBMhToUDWWU' },
    { contentId: 'qACRwIYdAGQ' },
    { contentId: 'I6J-wchHm7M' },
    { contentId: 's-4GwJLNmD8' },
    { contentId: 'SeaoAchqKEc' },
    { contentId: 'hwXAKAFvcU8' },
    { contentId: 'CVU7xVt_DA4' },
    { contentId: 'uLDFN1uvyTc' },
    { contentId: 'Y-eNwrfz7j8' },
    { contentId: 'K81OstbaPOU' },
    { contentId: '7yIvoILQPxs' },
    { contentId: 'GvVlaE90cBI' },
    { contentId: 'DZJdMLxwg9o' },
    { contentId: 'MLu9yNurIc8' },
    { contentId: '83-O_HpTzeU' },
    { contentId: '3tvR2bGmCSM' },
    { contentId: 'Emc1wZcLyaU' },
    { contentId: 'G8JlxBPzJ3c' },
    { contentId: 'yCif_owDPsM' },
    { contentId: '2vvumqWPA_4' },
    { contentId: '6FGgzyTGQTs' },
    { contentId: 'mGdiQW58OVM' },
    { contentId: 'xn3EHws9FKY' },
    { contentId: '369q9xNMlsE' },
    { contentId: 'pTglZJimQW0' },
    { contentId: 'ilGZJxpT5iY' },
    { contentId: 'qRIcywseXmE' },
    { contentId: 'LvOWJh3iAUg' },
    { contentId: '-uB3HsQy1jM' },
    { contentId: 'nQL_Vfo1ayo' },
    { contentId: 'OTJlUooMyZk' },
    { contentId: 'RXLz1L5a-mA' },
    { contentId: 'B9J12dkAV_A' },
    { contentId: 'o3BzfasPqzg' },
    { contentId: 'dcAae86c6NY' },
    { contentId: 'R0TnQXeX2gc' },
    { contentId: 'CtpgShh8A0Y' },
    { contentId: 'cD4KtT6IFYs' },
    { contentId: 'eSJX_mhHKy4' },
    { contentId: 'F6Y2aQEXkmQ' },
    { contentId: 'dV76jrc6WgE' },
    { contentId: 'DyPvO__0KHY' },
    { contentId: 'Ul_-TLqP30M' },
    { contentId: 'TLfmK7HM2fY' },
    { contentId: 'TrXifvnXlnM' },
    { contentId: '0qp4SQ4Kpbs' },
    { contentId: 'dG4Kowe5CMs' },
    { contentId: 'xT8zGda9PZw' },
    { contentId: 'T7qR8IICWgU' },
    { contentId: 'H9aCKc1eyt8' },
    { contentId: 'VZrn34eOBec' },
    { contentId: 'CYnfpjbjoeY' },
    { contentId: '3x6PBSnh4KM' },
    { contentId: 'AqC8BU6M4tU' },
    { contentId: '09o-icS-8iM' },
    { contentId: 'ZHk0miA8br0' },
    { contentId: 'DusWD8kere8' },
    { contentId: '4yDRK7Q6EGw' },
    { contentId: 'xwZl-n5x0hg' },
    { contentId: 'Sz7U-FGkR7Q' },
    { contentId: 'Ago3SMffJ-I' },
    { contentId: 'pb6jFLSpCEU' },
    { contentId: 'nh5W1tcE3DU' },
    { contentId: 'yZOca5JHSVc' },
    { contentId: '84E_olaoi9c' },
    { contentId: 'AQfCmEyoDvc' },
    { contentId: '_zhRi1JuLhw' },
    { contentId: 'U0C1jxqBbDE' },
    { contentId: 'hQIPjflAJJI' },
    { contentId: 'UKHTwUA4QnE' },
    { contentId: 'iwt1DhYAEZk' },
    { contentId: '1sfeiMxdQT0' },
    { contentId: 'uAm9wa2UkJI' }
  ]
  // TEMP

  const { username, password, data = student_data } = req.body

  Student.exists({ username })
    .then(usernameExists => {
      if (usernameExists)
        res.status(CONFLICT).json({ message: 'Username already exists' })
      else {
        const newStudent = new Student({
          username,
          password,
          data // TEMP
        })

        newStudent.save((err, data) => {
          if (err)
            res
              .status(INTERNAL_ERROR)
              .json({ message: `Error Adding Student: ${newStudent}` })
          else res.status(CREATED).json(data)
        }) // TODO: distinct username check
      }
    })
    .catch(() =>
      res.status(INTERNAL_ERROR).json({ message: `Error during registration` })
    )
}

const authenticate = (req, res) => {}

// Instantiate the controller object
const authController = {
  login,
  register,
  authenticate
}

module.exports = authController
