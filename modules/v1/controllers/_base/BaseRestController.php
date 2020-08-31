<?php

namespace app\modules\v1\controllers\_base;

use yii\filters\Cors;
use yii\rest\Controller;

class BaseRestController extends Controller
{
    public function behaviors()
    {
        $parent = parent::behaviors();
        return array_merge($parent, [
            'corsFilter' => [
                'class' => Cors::class,
                'cors' => [
                    'Access-Control-Expose-Headers' => [ '*' ],
                    'Access-Control-Request-Headers' => [ '*' ],
                    'Origin' => ['*'],
                    'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'],
                ],
            ],
        ]);
    }
}