<?php

namespace App\Entity;

use App\Repository\PlayerRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity(repositoryClass=PlayerRepository::class)
 * @ApiResource(
 *     attributes={
 *         "pagination_items_per_page"=10,
 *         "order"={"createdAt": "DESC"}
 *     },
 *     collectionOperations={
 *         "get"={
 *             "normalization_context"={"groups"={"player:read"}}
 *         },
 *         "post"={
 *             "denormalization_context"={"groups"={"player:write"}},
 *             "validation_groups"={"Default", "player:write"}
 *         }
 *     },
 *     itemOperations={
 *         "get"={
 *             "normalization_context"={"groups"={"player:read"}}
 *         },
 *         "put"={
 *             "denormalization_context"={"groups"={"player:write"}},
 *             "validation_groups"={"Default", "player:write"}
 *         },
 *         "patch"={
 *             "denormalization_context"={"groups"={"player:write"}},
 *             "validation_groups"={"Default", "player:write"}
 *         },
 *         "delete"={}
 *     },
 *     normalizationContext={
 *         "groups"={"player:read"}
 *     },
 *     denormalizationContext={
 *         "groups"={"player:write"}
 *     }
 * )
 * @ApiFilter(PropertyFilter::class)
 */
class Player
{
    public const POSITION_ATTAQUANT = 'Attaquant';
    public const POSITION_DEFENSEUR = 'Défenseur';
    public const POSITION_GARDIEN = 'Gardien';
    public const POSITION_MILIEU = 'Milieu';

    public static function getPositionChoices(): array
    {
        return [
            self::POSITION_ATTAQUANT => 'Attaquant',
            self::POSITION_DEFENSEUR => 'Défenseur',
            self::POSITION_GARDIEN => 'Gardien',
            self::POSITION_MILIEU => 'Milieu',
        ];
    }

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"player:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"player:read", "player:write"})
     * @Assert\NotBlank()
     * @Assert\Length(min=2, max=255)
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"player:read", "player:write"})
     * @Assert\NotBlank()
     * @Assert\Length(min=2, max=255)
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"player:read", "player:write"})
     * @Assert\NotBlank()
     * @Assert\Choice(callback="getPositionChoices")
     */
    private $position;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"player:read", "player:write"})
     * @Assert\NotBlank()
     * @Assert\Length(min=2, max=255)
     */
    private $team;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"player:read", "player:write"})
     * @Assert\NotBlank()
     * @Assert\Range(min=16, max=50)
     */
    private $age;

    /**
     * @ORM\Column(type="datetime")
     * @Gedmo\Timestampable(on="create")
     * @Groups({"player:read"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime")
     * @Gedmo\Timestampable(on="update")
     * @Groups({"player:read"})
     */
    private $updatedAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getPosition(): ?string
    {
        return $this->position;
    }

    public function setPosition(string $position): self
    {
        if (!in_array($position, array_keys(self::getPositionChoices()))) {
            throw new \InvalidArgumentException("Invalid position");
        }

        $this->position = $position;

        return $this;
    }

    public function getTeam(): ?string
    {
        return $this->team;
    }

    public function setTeam(string $team): self
    {
        $this->team = $team;

        return $this;
    }

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(int $age): self
    {
        $this->age = $age;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }
}