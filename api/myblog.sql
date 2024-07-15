CREATE TABLE `myblog`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `img` VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE `myblog`.`users` 
RENAME TO `myblog`.`users`;

CREATE TABLE `myblog`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `desc` VARCHAR(1000) NOT NULL,
  `img` VARCHAR(255) NOT NULL,
  `date` DATETIME NOT NULL,
  `uid` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_id_posts`
    FOREIGN KEY (`uid`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


INSERT INTO `myblog`.`users` (`id`, `username`, `email`, `password`) VALUES ('1', 'test', 'test', 'test');

INSERT INTO `myblog`.`posts` (`id`, `title`, `desc`, `img`, `date`, `uid`) VALUES ('1', 'title', 'desc', 'img', '2023-11-26', '1');

DELETE FROM `myblog`.`users` WHERE (`id` = '1');
