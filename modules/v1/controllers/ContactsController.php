<?php

namespace app\modules\v1\controllers;

use yii\helpers\Json;
use app\models\Contacts;
use app\modules\v1\controllers\_base\BaseRestController;

class ContactsController extends BaseRestController
{
    public function actionIndex() {
       $model = new Contacts();
       $contactsList = $model->getAll();
       return $model->mapByGroups( $contactsList );
    }

    public function actionCreate() {
        $model = new Contacts();
        $requestBody = [
            $model->formName() => Json::decode( \Yii::$app->request->rawBody )
        ];

        if ( $requestBody && $model->load( $requestBody ) && $model->validate() ) {
           return $model->create();
        }
        \Yii::$app->response->statusCode = 400;
        return $model->getErrors();
    }

    public function actionView( int $id ) {
        $model = (new Contacts())->getById( $id );
        if ( !$model ) {
            \Yii::$app->response->statusCode = 404;
            return null;
        }
        return $model;
    }
}
