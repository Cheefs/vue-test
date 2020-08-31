<?php

use yii\db\Migration;

/**
 * Class m200830_151011_ctrate_contacts_table
 */
class m200830_151011_ctrate_contacts_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->execute(
          'create table contacts (
                id SERIAL PRIMARY KEY ,
                firstname varchar(128),
                lastname varchar(128),
                email varchar(128),
                phone varchar(20),
                position varchar(20),
                bio text
            );'
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->execute(
            'DROP table contacts'
        );
    }
}
