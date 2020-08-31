<?php

namespace app\models;

use yii\db\Exception;

/**
 * This is the model class for table "contacts".
 *
 * @property int $id
 * @property string|null $firstname
 * @property string|null $lastname
 * @property string|null $email
 * @property string|null $phone
 * @property string|null $position
 * @property string|null $bio
 */
class Contacts extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'contacts';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['firstname', 'email'], 'required'],
            [['id'], 'integer'],
            [['bio', 'position'], 'string'],
            [['firstname', 'lastname', 'email'], 'string', 'max' => 128],
            [['phone'], 'string', 'max' => 20],
            [['id'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'firstname' => 'Firstname',
            'lastname' => 'Lastname',
            'email' => 'Email',
            'phone' => 'Phone',
            'position' => 'Position',
            'bio' => 'Bio',
        ];
    }

    public function create() {
        $rawQuery = strip_tags( stripslashes(
            sprintf('
             INSERT INTO contacts (firstname, lastname, email, phone, position, bio)
                values ( "%s", "%s", "%s", "%s", "%s", "%s" )',
                $this->firstname,
                $this->lastname,
                $this->email,
                $this->phone,
                $this->position,
                $this->bio
            )
        ));

        try {
            $connection = \Yii::$app->getDb();
            $command = $connection->createCommand($rawQuery);
            $command->execute();
            return \Yii::$app->db->getLastInsertID();
        } catch ( \Exception $ex ) {
            return false;
        }
    }

    public function getAll()
    {
        $connection = \Yii::$app->getDb();
        $command = $connection->createCommand('
            SELECT * FROM contacts
        ');

        try {
            $data = $command->queryAll();
        } catch (Exception $e) {
            $data = [];
        }
        return $data;
    }

    public function mapByGroups( Array $arr ) {
        $res = [];
        foreach ( $arr as $item ) {
            $groupKey = $item['firstname'][0];
            if ( is_numeric( $groupKey ) ) {
                $groupKey = '#';
            }
            $res[ $groupKey ][] = $item;
        }
        return $res;
    }

    public function getById($id) {
        $connection = \Yii::$app->getDb();
        $command = $connection->createCommand(sprintf('
            SELECT * FROM contacts where id = %s
        ', $id ));

        try {
           return $command->queryOne();
        } catch (\Exception $ex ) {
            return null;
        }
    }
}
