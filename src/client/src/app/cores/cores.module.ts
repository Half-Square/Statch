import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarCore } from './avatar/avatar.core';
import { BadgeCore } from './badge/badge.core';
import { IconCore } from './icon/icon.core';
import { ButtonCore } from './button/button.core';
import { CheckboxCore } from './checkbox/checkbox.core';
import { InputCore } from './input/input.core';
import { InputPwdCore } from './input-pwd/input-pwd.core';
import { LinkCore } from './link/link.core';
import { ProgressCore } from './progress/progress.core';
import { RadioCore } from './radio/radio.core';
import { TagCore } from './tag/tag.core';



@NgModule({
  declarations: [
    AvatarCore,
    BadgeCore,
    IconCore,
    ButtonCore,
    CheckboxCore,
    InputCore,
    InputPwdCore,
    LinkCore,
    ProgressCore,
    RadioCore,
    TagCore
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AvatarCore,
    BadgeCore,
    IconCore,
    ButtonCore,
    CheckboxCore,
    InputCore,
    InputPwdCore,
    LinkCore,
    ProgressCore,
    RadioCore,
    TagCore
  ]
})
export class CoresModule { }
