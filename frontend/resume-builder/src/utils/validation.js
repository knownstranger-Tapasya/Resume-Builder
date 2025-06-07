export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
  return re.test(password);
};

export const validatePhone = (phone) => {
  // Basic phone number validation
  const re = /^\+?[\d\s-]{10,}$/;
  return re.test(phone);
};

export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateResumeData = (data) => {
  const errors = {};

  // Title validation
  if (!data.title?.trim()) {
    errors.title = 'Resume title is required';
  }

  // Profile Info
  if (!data.profileInfo?.fullName?.trim()) {
    errors.fullName = 'Full name is required';
  }
  if (!data.profileInfo?.designation?.trim()) {
    errors.designation = 'Designation is required';
  }
  if (!data.profileInfo?.summary?.trim()) {
    errors.summary = 'Professional summary is required';
  }

  // Contact Info
  if (!data.contactInfo?.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.contactInfo.email)) {
    errors.email = 'Invalid email address';
  }
  
  if (data.contactInfo?.phone && !validatePhone(data.contactInfo.phone)) {
    errors.phone = 'Invalid phone number';
  }
  if (data.contactInfo?.linkedin && !validateURL(data.contactInfo.linkedin)) {
    errors.linkedin = 'Invalid LinkedIn URL';
  }
  if (data.contactInfo?.github && !validateURL(data.contactInfo.github)) {
    errors.github = 'Invalid GitHub URL';
  }
  if (data.contactInfo?.website && !validateURL(data.contactInfo.website)) {
    errors.website = 'Invalid website URL';
  }

  // Work Experience
  if (data.workExperience?.length > 0) {
    data.workExperience.forEach((exp, index) => {
      if (!exp.company?.trim()) {
        errors[`workExperience.${index}.company`] = 'Company name is required';
      }
      if (!exp.role?.trim()) {
        errors[`workExperience.${index}.role`] = 'Role is required';
      }
      if (!exp.startDate?.trim()) {
        errors[`workExperience.${index}.startDate`] = 'Start date is required';
      }
      if (!exp.description?.trim()) {
        errors[`workExperience.${index}.description`] = 'Description is required';
      }
    });
  }

  // Education
  if (data.education?.length > 0) {
    data.education.forEach((edu, index) => {
      if (!edu.degree?.trim()) {
        errors[`education.${index}.degree`] = 'Degree is required';
      }
      if (!edu.institution?.trim()) {
        errors[`education.${index}.institution`] = 'Institution is required';
      }
      if (!edu.startYear?.trim()) {
        errors[`education.${index}.startYear`] = 'Start year is required';
      }
    });
  }

  // Skills
  if (data.skills?.length > 0) {
    data.skills.forEach((skill, index) => {
      if (!skill.name?.trim()) {
        errors[`skills.${index}.name`] = 'Skill name is required';
      }
      if (!skill.level) {
        errors[`skills.${index}.level`] = 'Skill level is required';
      }
    });
  }

  // Projects (if any are added, they must be complete)
  if (data.projects?.length > 0) {
    data.projects.forEach((project, index) => {
      if (!project.title?.trim()) {
        errors[`projects.${index}.title`] = 'Project title is required';
      }
      if (!project.description?.trim()) {
        errors[`projects.${index}.description`] = 'Project description is required';
      }
      if (project.github && !validateURL(project.github)) {
        errors[`projects.${index}.github`] = 'Invalid GitHub URL';
      }
      if (project.liveDemo && !validateURL(project.liveDemo)) {
        errors[`projects.${index}.liveDemo`] = 'Invalid demo URL';
      }
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}; 